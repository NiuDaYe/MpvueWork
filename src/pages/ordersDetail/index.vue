<template>
    <div class="orderDetail">
        <i-tabs :current="currentTab" @change="handleChange">
            <i-tab key="tab1" title="物品详情"></i-tab>
            <i-tab key="tab2" title="订单信息"></i-tab>
        </i-tabs>
        <div class="times">
            <i-cell-group >
                <i-cell  title="到货日期" :value="details.inDate"></i-cell>
            </i-cell-group>
        </div>
        <scroll-view scroll-y class="cell-list-border" @scrolltolower="lower" :style="'height:'+contentHeight">
            <div class="left" v-if="tabShow">
                <view>
                    <p class="distributionCenter"><span v-if="details.detailList">{{details.detailList[0].dcName}}</span></p>
                    <div class="list" v-for="item in details.detailList" :key="item">
                        <div class="name">
                            <span>{{item.materialName}}</span>
                            <p class="price"><span>￥{{item.shippingPrice}}</span> <span>* {{item.qty}}</span> </p>
                        </div>
                        <p class="message">
                            <span><i-tag v-if="item.spec">{{item.spec}}</i-tag></span>
                            <span>￥{{item.individualPrice}}</span>
                        </p>
                    </div>
                </view>
            </div>
            <div class="right" v-if="!tabShow">
                <div class="header_adreass">
                    <i-icon class="coordinates_fill" type="coordinates_fill" size="24" color="#989898"/>
                    <div class="address_detail">
                        <p> <span>收货人:{{information.linkman}}</span> <span>{{information.phone}}</span> </p>
                        <p>收货地址:{{information.address}}</p>
                    </div>
                    <i-icon class="enter" type="enter" size="16"/>
                </div>
                <dl class="orderMesage">
                    <dt>单据信息</dt>
                    <dd> <span>订单号</span> <span>{{details.billNo}}</span> </dd>
                    <dd> <span>支付金额</span> <span class="pubColor">￥{{details.paymentAmt}}</span>  </dd>
                    <dd> <span>支付方式</span> <span>{{details.paymentType}}</span> </dd>
                    <dd> <span>下单时间</span> <span>{{details.orderDate}}</span> </dd>
                    <dd> <span>结算方式</span> <span>{{details.clearingType}}</span> </dd>
                </dl>
            </div>
        </scroll-view>
        <div class="checkOrderBottom">
            <div class="price">
                <p>&nbsp;&nbsp;&nbsp;合计： <span>￥{{totalPrice}}</span> </p>
                <p>待支付：<span>￥{{totalPrice}}</span> </p>
            </div>
            <template v-if="detailMessage.state == 'sourceOrderPay'">
                <div class="btn" @click="topay">支付</div>
            </template>

            <template v-else-if="detailMessage.state == 'savedDcOrder'">
                <div class="btn" v-if="isReceiv" @click="showReceiving">确认收货</div>
            </template>
        </div>
        <i-modal title="支付" :visible="visiblePay" :actions="actionsPay" @click="showPayList">
            <view>请选择支付方式</view>
        </i-modal>
        <i-modal title="收货确认" :visible="visibleCannot" :actions="actionsCannot" @click="operationReceiving">
            <view>是否确认收货？</view>
        </i-modal>
        <i-message id="message" />
    </div>
</template>

<script>
import wxp from 'minapp-api-promise'
import fetch from '@/utils/fetch'
const { $Message } = require('../../../static/examples/base/index');
import { findOrderDetail,confirmReceive,balancePayment } from '@/api/request'

export default{
    data(){
        return{
            currentTab: 'tab1',
            winHeight:null,
            tabShow:true,
            details:{},
            information:{
                address:'',
                linkman:'',
                phone:''
            },
            detailMessage:{},
            visiblePay:false,               // 支付列表
            visibleCannot:false,            // 取消订单弹窗
            isReceiv:true,                  // 是否收货
            actionsPay: [
                // {
                //     name: '微信',
                //     color: '#2d8cf0'
                // },
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
        handleChange (detail) {
            this.currentTab = detail.mp.detail.key;
            if(this.currentTab == "tab1"){
                this.tabShow = true;
            }else if(this.currentTab == "tab2"){
                this.tabShow = false;
            }
        },
        getDetailInfo(){
            this.detailMessage = wx.getStorageSync('detailMessage');
            let detailMessage = wx.getStorageSync('detailMessage');
            if(detailMessage.state == "sourceOrderPay"){ detailMessage.state = "sourceOrder"; }
            let data = {
                "tenancy_id": detailMessage.tenancy_id,
                "store_id": detailMessage.store_id,
                "data":[{
                       "id": detailMessage.id,
                       "dataType": detailMessage.state
                 }]
            }
            wx.showLoading({title: '加载中...',})

            findOrderDetail(data).then(res=>{
                if(res.errcode == 0){
                    res.data[0].detailList.map((item)=>{
                        item.individualPrice = (Number(item.qty * item.shippingPrice)).toFixed(2);
                    })
                    this.details = res.data[0];
                    setTimeout(function(){wx.hideLoading()},1000)
                }else{
                    wx.hideLoading()
                    $Message({
                        content: res.errmsg,
                        type: 'error'
                    });
                }
            })
        },
        showReceiving(){
            this.visibleCannot = true;
        },
        topay(id){
            this.visiblePay = true;
        },
        showPayList(e){
            const index = e.mp.detail.index;
            if (index === 0) {
                //console.log('调微信支付');
                this.balancePay();
            }else if(index === 1){
                console.log('调余额支付');
                this.balancePay();
            }
            this.visiblePay = false;
        },
        operationReceiving(e){
            const index = e.mp.detail.index;
            if(index === 0){
                this.visibleCannot = false;
            } else if (index === 1){
                this.receiving();  // 调确认收货接口
            }
        },
        // 确认收货
        receiving(){
            let userInfo = wx.getStorageSync('userInfo');
            let detailMessage = wx.getStorageSync('detailMessage');    //  详情页单个产品信息
            let data = {
                "tenancy_id": userInfo.tenancyId,
                "store_id": userInfo.storeId,
                "data":[{
                          "id": detailMessage.id,
                          "entryId": userInfo.userId,
                          "entryName": userInfo.userName,
                          "entryCode": userInfo.userCode
                }]
            }

            confirmReceive(data).then(res=>{
                if(res.errcode == 0){
                    this.visibleCannot = false;
                    this.isReceiv = false;
                    $Message({
                        content: '收货成功！',
                        type: 'success'
                    });
                }else{
                    this.visibleCannot = false;
                    $Message({
                        content: res.errmsg,
                        type: 'error'
                    });
                }
            })
        },
        // 余额支付
        balancePay(){
            let userInfo = wx.getStorageSync('userInfo');
            let detailMessage = wx.getStorageSync('detailMessage');
            let data = {
                 "tenancy_id": userInfo.tenancyId,
                 "store_id": userInfo.storeId,
                 "userId": userInfo.userId,
                 "userName": userInfo.userName,
                 "userCode": userInfo.userCode,
                 "data":[{
                    "id": detailMessage.id,
                 }]
            }

            balancePayment(data).then(res=>{
                if(res.errcode == 0){
                    this.visiblePay = false;
                    $Message({
                        content: '余额支付成功！',
                        type: 'success'
                    });
                    wx.reLaunch({
                      url: '../operatingResults/main?pay=1'
                    })
                }else{
                    this.visiblePay = false;
                    $Message({
                        content: res.errmsg,
                        type: 'error'
                    });
                }
            })
        }
    },
    async onLoad() {
        let info = await wxp.getSystemInfo();
        let userInfo = wx.getStorageSync('userInfo');
        this.winHeight = info.windowHeight;
        await wxp.setNavigationBarTitle({
          title: '订单详情'
        })
        this.getDetailInfo();
        this.information.address = userInfo.address
        this.information.linkman = userInfo.linkman
        this.information.phone = userInfo.phone
    },
    computed: {
        contentHeight(){
            if (this.winHeight) {
                return this.winHeight - 130 + 'px'
            }
        },
        totalPrice(){
            let total = 0;
            if(this.details.detailList){
                this.details.detailList.map((item)=>{
                    total += Number(item.individualPrice);
                })
            }
            return total;
        }
    },
}
</script>

<style scoped lang="scss">
.orderDetail{
    background: #f2f2f2;
    .times{
        border-top: 10rpx solid #f0f0f0;
        border-bottom: 8rpx solid #f0f0f0;
    }
    .list{
        font-size: 26rpx;
        color: #666666;
        padding: 16rpx 30rpx;
        border-bottom: 1rpx solid #f0f0f0;
        background: #fff;
        .name{
            display: flex;
            justify-content: space-between;
            padding-bottom: 10rpx;
            .price span:nth-child(1){
                padding-right:8rpx;
                color: #fc6621;
            }
        }
        .message{
            display: flex;
            justify-content: space-between;
        }
    }
    .checkOrderBottom{
        width: 98%;
        height: 100rpx;
        border-top: 1px solid #cccccc;
        display: flex;
        justify-content:space-between;
        position: fixed;
        bottom:0;
        background: #ffffff;
        padding-left: 2%;
        .price{
            color:#333333;
            font-size: 30rpx;
            padding-top: 8rpx;
            margin-right: 20rpx;
            span{
                color: #fc091b;
            }
        }
        .btn{
            width: 200rpx;
            height: 100rpx;
            background: #3f9e6e;
            text-align: center;
            line-height: 100rpx;
            color: #fff;
            font-size: 34rpx;
        }
    }
    .distributionCenter{
        display: flex;
        justify-content: space-between;
        border-bottom: 1rpx solid #f0f0f0;
        font-size: 30rpx;
        padding: 10rpx 20rpx;
        color:#666666;
        height: 50rpx;
        line-height: 50rpx;
    }
    .header_adreass{
        display:flex;
        border-bottom: 1rpx solid #e4e4e4;
        padding-bottom: 18rpx;
        padding-top:10rpx;
        background: #fff;
        .coordinates_fill{
            margin-top:20rpx;
        }
        .address_detail{
            font-size: 30rpx;
            color: #333333;
        }
        .address_detail p{
            width: 630rpx;
            line-height: 44rpx;
            padding-right: 38rpx;
        }
        .address_detail p:nth-child(1){
            width: 100%;
            display: inline-flex;
            justify-content:space-between;
        }
        .enter{
            margin-top: 20rpx;
        }
        .i-icon-enter{
            font-weight:bold;
        }
    }
    .orderMesage{
        background: #fff;
        margin-top: 30rpx;
        dt{
            border-bottom: 1px solid #f0f0f0;
            height: 70rpx;
            line-height: 70rpx;
            display: block;
            font-size: 32rpx;
            text-indent: 1em;
            color: #666666;
        }
        dd{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f0f0f0;
            color: #999999;
            padding:0 30rpx;
            font-size: 28rpx;
            .pubColor{
                color: #fa915a;
            }
            span{
                display: block;
                height: 60rpx;
                line-height: 60rpx;
            }
        }
    }
}
</style>
