<!-- 核对订单页面 -->
<template >
    <div class="checkOrder" >

        <div class="header">
            <div class="header_adreass">
                <i-icon class="coordinates_fill" type="coordinates_fill" size="24" color="#989898"/>
                <div class="address_detail">
                    <p> <span>收货人:{{information.linkman}}</span> <span>{{information.phone}}</span> </p>
                    <p>收货地址:{{information.address}}</p>
                </div>
                <i-icon class="enter" type="enter" size="16"/>
            </div>

            <div class="expectData">
                <span>期望到货日期</span>
                <view class="section">
                  <picker mode="date" :value="date" @change="bindDateChange">
                    <view class="picker">{{date}}</view>
                  </picker>
                </view>
                <i-icon class="enter" type="enter" size="16"/>
            </div>
        </div>

        <scroll-view scroll-y class="cell-list-border" @scrolltolower="lower" :style="'height:'+contentHeight">

            <div class="detailsList">
                <p class="distributionCenter">北京配送中心</p>

                <div class="details" v-for="item in selectFoods" :key="item">
                    <p>
                        <span class="fontOne">{{item.materialName}}({{item.unitName}})</span>
                        <span>￥{{item.shippingPrice}}/{{item.unitName}}</span>
                    </p>
                    <p> <span>{{item.spec}}</span> <span>*{{item.count}}</span> </p>
                    <p> <span></span>  <span class="fontOne">￥ {{item.individualPrice}} </span> </p>
                </div>

            </div>

        </scroll-view>

        <div class="checkOrderBottom">
            <div class="price">
                <p>&nbsp;&nbsp;&nbsp;合计： <span>￥{{totalPrice}}</span> </p>
                <p>待支付：<span>￥{{totalPrice}}</span> </p>
            </div>
            <div class="btn" @click="sub"> 提交订单 </div>
        </div>
        <i-message id="message" />

        <i-modal title="支付" :visible="visiblePay" :actions="actionsPay" @click="showPayList">
            <view>请选择支付方式</view>
        </i-modal>

    </div>
</template>

<script>
import wxp from 'minapp-api-promise'
import fetch from '@/utils/fetch'
import Vue from 'vue';
const { $Message } = require('../../../static/examples/base/index');

export default{
    data(){
        return{
            winHeight:null,
            height:144,
            selectFoods:null,
            date: '2000-09-01',
            information:{
                address:'',
                linkman:'',
                phone:''
            },
            visiblePay:false,               // 支付列表
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
        }
    },
    async onLoad() {
        let info = await wxp.getSystemInfo();
        let myDate = new Date();
        let userInfo = wx.getStorageSync('userInfo');
        let selectFoods = wx.getStorageSync('selectFoods');

        await wxp.setNavigationBarTitle({
          title: '核对订单'
        })
        selectFoods.map((item)=>{
            item.individualPrice = (Number(item.count * item.shippingPrice)).toFixed(2);
        })

        this.selectFoods = selectFoods;
        this.winHeight = info.windowHeight;
        this.date = myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDate();

        this.information.address = userInfo.address
        this.information.linkman = userInfo.linkman
        this.information.phone = userInfo.phone

    },
    methods:{
        bindDateChange: function(e) {
            this.date = e.mp.detail.value;
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
        // 提交订单
        sub(){
            let _this = this;
            let userInfo = wx.getStorageSync('userInfo');
            let selectFoods = wx.getStorageSync('selectFoods');
            let data = {
                "tenancy_id":userInfo.tenancyId,
                "store_id":userInfo.storeId,
                "data":[
                    {
                        "storeId":userInfo.storeId,
                        "storeCode":userInfo.storeCode,
                        "storeName":userInfo.storeName,
                        "dcId": selectFoods[0].dcId,
                        "dcCode":selectFoods[0].dcCode,
                        "dcName":selectFoods[0].dcName,
                        "clearingType":selectFoods[0].clearingType,
                        "address":this.information.address,
                        "phone":this.information.phone,
                        "hopeDate":this.date + " " + "00:00:00",
                        "entryId":userInfo.userId,
                        "entryCode":userInfo.userCode,
                        "entryName":userInfo.userName,
                        "detailDtoList":[]
                    }
                ]
            }
            let detailDtoList = data.data[0].detailDtoList;
            detailDtoList = this.selectFoods;
            detailDtoList.map((item)=>{
                item.qty = item.count;
                item.amt = item.individualPrice;
                delete item.clearingTypeName;
                delete item.lastQty;
                delete item.spec;
                // delete item.count;
                // delete item.individualPrice;
            })
            data.data[0].detailDtoList = detailDtoList;

            fetch.post('/appOrder/submitOrder', data)
            .then(function (res) {
                if(res.errcode == 0){
                    let data = {
                        "id": res.data[0].id,
                        // "state": "sourceOrderPay",
                        "state": "sourceOrder",
                        "tenancy_id": userInfo.tenancyId,
                        "store_id": userInfo.storeId
                    }
                    wx.setStorageSync('detailMessage',data);    //  进详情页使用  存单个产品信息

                    if(res.data[0].needToPay == false){         // 不需要支付的话 跳转到下单成功页面
                        //console.log('resssss',res);           //查看提交订单后返回的数据 唯一订单号  支付时使用
                        wx.redirectTo({
                          url: '../operatingResults/main?pay=1'
                        })
                    }else if(res.data[0].needToPay == true){
                        _this.visiblePay = true;
                    }
                }else{
                    $Message({
                        content: res.errmsg,
                        type: 'error'
                    });
                }
            })
            .catch(function (error) {
                $Message({
                    content: "提交订单失败！",
                    type: 'error'
                });
            });
        },
        // 余额支付
        balancePay(){
            let _this = this;
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

            fetch.post('/appOrder/balancePayment', data)
            .then(function (res) {
                if(res.errcode == 0){
                    _this.visiblePay = false;
                    $Message({
                        content: '余额支付成功！',
                        type: 'success'
                    });

                    setTimeout(()=>{
                        wx.reLaunch({
                          url: '../operatingResults/main?pay=1'
                        })
                    },1000)
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
    computed: {
        contentHeight(){
            if (this.winHeight) {
                return this.winHeight - this.height + 'px'
            }
        },
        totalPrice(){
            let total = 0;
            if(this.selectFoods){
                this.selectFoods.map((item)=>{
                    total += Number(item.individualPrice);
                })
            }
            return total;
        }
    },
}
</script>

<style scoped lang="scss">
.checkOrder{
    background: #f2f2f2;
    color: #495060;
    .header_adreass{
        display:flex;
        border-bottom: 1rpx solid #f0f5f8;
        padding-bottom: 18rpx;
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
    .expectData{
        display: flex;
        width: 100%;
        font-size: 28rpx;
        padding-top: 20rpx;
        padding-bottom: 20rpx;
        border-bottom: 8rpx solid #f0f5f8;
        background: #fff;
        span:nth-child(1){
            padding-left: 56rpx;
        }
        .section{
            padding-left: 300rpx;
        }

    }

    .detailsList{
        border-bottom: 1px solid #f0f5f8;
        border-top: 1px solid #e4e4e4;
        margin-top: 12rpx;
        background: #fff;
        .distributionCenter{
            text-indent: 2em;
            border-bottom: 1px solid #f0f5f8;
            font-size: 26rpx;
            line-height: 58rpx;
        }
        .details{
            padding-top: 20rpx;
            padding-bottom: 16rpx;
            border-bottom: 1px solid #f0f5f8;
            p{
                display: flex;
                justify-content:space-between;
                padding-left: 60rpx;
                padding-right: 30rpx;
                font-size: 24rpx;
                line-height: 40rpx;
                color: #999999;
                .fontOne{
                    font-size: 28rpx;
                    color: #495060;
                }
            }
        }
    }

    .checkOrderBottom{
        width: 100%;
        height: 100rpx;
        display: flex;
        justify-content:flex-end;
        position: fixed;
        bottom:0;
        background: #ffffff;
        color: #495060;
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
}
</style>
