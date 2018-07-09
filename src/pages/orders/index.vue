<template>
    <div class="orders">

        <view class="currentTab">
            <i-tabs :current="currentTab" @change="handleChangeTab">
                <i-tab key="tab1" title="源订单"></i-tab>
                <i-tab key="tab2" title="待支付"></i-tab>
                <i-tab key="tab3" title="待发货"></i-tab>
                <i-tab key="tab4" title="待收货"></i-tab>
                <i-tab key="tab5" title="已完成"></i-tab>
            </i-tabs>
        </view>

        <scroll-view scroll-y class="cell-list-border" @scrolltolower="lower" :style="'height:'+contentHeight">
            <div class="orderList">
                <view class="list" v-for="item in orderList" :key="item">
                    <p class="times">{{item.orderDate}}</p>
                    <div class="content">
                        <p class="payState" @click=toDetail(item.id,state)>
                            <span>{{item.billNo}}</span>
                            <span class="pubColor">
                                <template v-if="state == 'sourceOrderPay'">待支付</template>
                                <template v-else-if="state == 'deliveryOrder'">待发货</template>
                                <template v-else-if="state == 'savedDcOrder'">待收货</template>
                                <template v-else-if="state == 'auditedDcOrder'">
                                    <template v-if="item.receiveStatus == receive_status_finish"> 收货完成 </template>
                                    <template v-else-if="item.receiveStatus == return_auditing"> 退货审核中 </template>
                                    <template v-else-if="item.receiveStatus == returned_reimburse"> 退货退款 </template>
                                    <template v-else-if="item.receiveStatus == reimburse"> 仅退款 </template>
                                    <template v-else-if="item.receiveStatus == exchange_goods"> 换货 </template>
                                    <template v-else-if="item.receiveStatus == turn_down"> 驳回 </template>
                                </template>
                            </span>
                        </p>
                        <p class="abstract">物品摘要：{{item.materialInfo}}</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥{{item.totalAmt}}</span> </p>
                            <template v-if="state == 'sourceOrder'">
                                <span class="pubClass" @click=toDetail(item.id,state)>查看源单</span>
                            </template>
                            <template v-else-if="state == 'sourceOrderPay'">
                                <span @click="cancelOrderEvent(item.id)">取消订单</span>
                                <span class="pubClass" @click=topay(item.id)>支付</span>
                            </template>
                            <template v-else-if="state == 'deliveryOrder'">
                                <span class="pubClass" @click=toDetail(item.id,state)>查看源单</span>
                            </template>
                            <template v-else-if="state == 'savedDcOrder'">
                                <span class="pubClass" @click=toDetail(item.id,state)>去收货</span>
                            </template>
                            <template v-else-if="state == 'auditedDcOrder'">
                                <template v-if="receiveStatus == receive_status_finish">
                                    <span class="pubClass" @click=toDetail(item.id,state)>售后</span>
                                </template>
                                <template v-else>
                                    <span class="pubClass dish" @click=toDetail(item.id,state)>售后</span>
                                </template>
                            </template>
                        </div>
                    </div>
                </view>

            </div>
        </scroll-view>

        <div class="currentBar">
            <i-tab-bar :current="currentBar" color="#2d8cf0" @change="handleChangeBar">
                <navigator url = "../goods/main" open-type ="redirect">
                    <i-tab-bar-item key="createtask" icon="createtask" current-icon="createtask_fill" title="商品"></i-tab-bar-item>
                </navigator>
                <i-tab-bar-item key="document" icon="document" current-icon="document_fill" title="订单"></i-tab-bar-item>
                <i-tab-bar-item key="dynamic" icon="dynamic" current-icon="dynamic_fill" title="报表"></i-tab-bar-item>
                <navigator url = "../index/main" open-type ="redirect">
                    <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
                </navigator>
            </i-tab-bar>
        </div>

        <i-modal title="支付" :visible="visiblePay" :actions="actionsPay" @click="showPayList">
            <view>请选择支付方式</view>
        </i-modal>

        <i-modal title="取消确认" :visible="visibleCannot" :actions="actionsCannot" @click="operationCannot">
            <view>是否取消此订单？</view>
        </i-modal>

        <i-message id="message" />

    </div>
</template>

<script>
import wxp from 'minapp-api-promise'
import fetch from '@/utils/fetch'
const { $Message } = require('../../../static/examples/base/index');

export default{
    data(){
        return{
            currentTab: 'tab1',
            currentBar:'document',
            winHeight:null,
            orderList:[],
            state:'sourceOrder',            // 各个状态标识
            visiblePay:false,               // 支付列表
            visibleCannot:false,            // 取消订单弹窗
            thisId:"",                      // 点击取消时存的ID
            actionsPay: [
                {
                    name: '支付宝',
                    color: '#2d8cf0',
                },
                {
                    name: '微信',
                    color: '#19be6b'
                },
                {
                    name: '余额',
                    color: '#19be6b'
                }
            ],
            actionsCannot: [
                {
                    name: '取消'
                },
                {
                    name: '确定',
                    color: '#ed3f14'
                }
            ]
        }
    },
    methods:{
        handleChangeTab (detail) {
            this.currentTab = detail.mp.detail.key;

            if(this.currentTab == "tab1"){              // 源订单
                this.getList("sourceOrder","");
                this.state = "sourceOrder";
            }else if(this.currentTab == "tab2"){        // 待支付
                this.getList("sourceOrder","0");
                this.state = "sourceOrderPay";
            }else if(this.currentTab == "tab3"){        // 代发货
                this.getList("deliveryOrder","");
                this.state = "deliveryOrder";
            }else if(this.currentTab == "tab4"){        // 待收货
                this.getList("savedDcOrder","");
                this.state = "savedDcOrder";
            }else if(this.currentTab == "tab5"){        // 已完成
                this.getList("auditedDcOrder","");
                this.state = "auditedDcOrder";
            }
        },
        handleChangeBar(detail){
            this.currentBar = detail.mp.detail.key;
            if(this.currentBar == "createtask"){
                console.log('跳转到商品');
            }else if(this.currentBar == "document"){
                console.log('跳转到订单');
            }else if(this.currentBar == "dynamic"){
                console.log('跳转到报表');
            }else if(this.currentBar == "mine"){
                console.log('跳转到个人中心');
            }
        },
        // 获取订单列表
        getList(dataType,dealStatus){
            let userInfo = wx.getStorageSync('userInfo');
            let _this = this;
            let data = {
                "tenancy_id":userInfo.tenancyId,
                "store_id":userInfo.storeId,
                "data":[
                    {
                        "dealStatus": dealStatus,
                        "dataType": dataType
                    }
                ],
                "pagination":{
                    "pagesize":1000,
                    "pageno":1
                }
            }
            fetch.post('/appOrder/findOrderList', data)
            .then(function (res) {
                if(res.errcode == 0){

                    _this.orderList = res.data;

                }else{
                    $Message({
                        content: "订单列表获取失败",
                        type: 'error'
                    });
                }
            })
            .catch(function (error) {
                $Message({
                    content: "订单列表获取失败",
                    type: 'error'
                });
            });
        },
        cancelOrderEvent(id){
            this.visibleCannot = true;
            this.thisId = id;
        },
        operationCannot(e){
            const index = e.mp.detail.index;
            let _this = this;
            if(index === 0){
                _this.visibleCannot = false;
            } else if (index === 1){
                _this.cancelOrder(_this.thisId);
            }
        },
        topay(id){
            this.visiblePay = true;
            this.thisId = id;
        },
        showPayList(e){
            const index = e.mp.detail.index;
            if (index === 0) {
                console.log('调支付宝支付');
            } else if (index === 1) {
                console.log('调微信支付');
            }else if(index === 2){
                console.log('调余额支付');
                this.balancePay();
            }
            this.visiblePay = false;
        },
        // 取消订单
        cancelOrder(id){
            let userInfo = wx.getStorageSync('userInfo');
            let _this = this;
            let data = {
                "tenancy_id":userInfo.tenancyId,
                 "store_id":userInfo.storeId,
                 "data":[{"id":id}]
            }

            fetch.post('/appOrder/cancelOrder', data)
            .then(function (res) {
                if(res.errcode == 0){
                    _this.visibleCannot = false;
                    _this.orderList.map((item,key)=>{
                        if(item.id == id){
                            _this.orderList.splice(key,1);
                        }
                    })
                    _this.visibleCannot = false;
                     $Message({
                         content: '订单取消成功',
                         type: 'success'
                     });
                }else{
                    _this.visibleCannot = false;
                    $Message({
                        content: res.errmsg,
                        type: 'error'
                    });
                }
            })
            .catch(function (error) {
                _this.visibleCannot = false;
                $Message({
                    content: "取消订单失败！",
                    type: 'error'
                });
            });

        },
        toDetail(id,state){
            let userInfo = wx.getStorageSync('userInfo');
            // sourceOrderPay 待支付
            let data = {
                "id": id,
                "state": state,
                "tenancy_id": userInfo.tenancyId,
                "store_id": userInfo.storeId
            }

            wx.setStorageSync('detailMessage',data);    //  进详情页  存单个产品信息
            wx.navigateTo({
              url: '../ordersDetail/main'
            })

        },
        balancePay(){
            let _this = this;
            let userInfo = wx.getStorageSync('userInfo');

            let data = {
                 "tenancy_id": userInfo.tenancyId,
                 "store_id": userInfo.storeId,
                 "userId": userInfo.userId,
                 "userName": userInfo.userName,
                 "userCode": userInfo.userCode,
                 "data":[{
                           "id": this.thisId,
                 }]
            }
            data = JSON.stringify(data);
            fetch.post('/appOrder/balancePayment', data)
            .then(function (res) {
                if(res.errcode == 0){
                    _this.visiblePay = false;
                    $Message({
                        content: '余额支付成功！',
                        type: 'success'
                    });

                    wx.reLaunch({
                      url: '../operatingResults/main?pay=1'
                    })
                }else{
                    _this.visiblePay = false;
                    $Message({
                        content: res.errmsg,
                        type: 'error'
                    });
                }
            })
            .catch(function (error) {
                _this.visiblePay = false;
                $Message({
                    content: "余额支付失败！",
                    type: 'error'
                });
            });

        }
    },
    async onLoad() {
        let info = await wxp.getSystemInfo();
        this.winHeight = info.windowHeight;
        await wxp.setNavigationBarTitle({
          title: '订单'
        })

        this.getList("sourceOrder","")
    },
    computed: {
        contentHeight() {
            if (this.winHeight) {
                return this.winHeight - 90 + 'px'
            }
        },
    },
}
</script>

<style scoped lang="scss">
.orders{
    .currentBar{
        width: 100%;
        position: fixed;
        bottom: 0;
    }
    .orderList{
        background: #f0f0f0;
        .list{
            font-size: 28rpx;
            color: #666666;
            background: #fff;
            margin-top: 20rpx;
            .times{
                text-indent: 1em;
                height: 60rpx;
                line-height: 60rpx;
            }
            .content{
                border:1px solid #f2f2f2;
                padding: 0 16px;
                .payState{
                    display:flex;
                    justify-content:space-between;
                    padding:  16rpx 0;
                }
                .pubColor{
                    color: #fa915a;
                }
                .abstract{
                    width: 100%;
                    height: 50rpx;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
                .money{
                    display: flex;
                    justify-content:space-between;
                    padding:20rpx 0;
                    border-top:1px solid #f2f2f2;
                    height: 60rpx;
                    line-height: 60rpx;
                    .pubClass{
                        border:1px solid #f2f2f2;
                        width:140rpx;
                        height: 60rpx;
                        text-align: center;
                        line-height: 60rpx;
                        border-radius: 6rpx;
                    }
                    .dish{
                        color: #333;
                    }
                }
            }
        }
    }
}

</style>
