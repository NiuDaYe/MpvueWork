<!-- 核对订单页面 -->
<template >
    <div class="checkOrder">
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
                  <i-icon class="enter" type="enter" size="16"/>
                </view>
            </div>
        </div>
        <scroll-view scroll-y class="cell-list-border" @scrolltolower="lower" :style="'height:'+contentHeight">
            <div class="detailsList">
                <p class="distributionCenter">{{selectFoods[0].dcName}}</p>
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
import publicaa from '@/utils/public'
import md5 from 'js-md5'
const { $Message } = require('../../../static/examples/base/index');
import { submitOrder,loginCredentialsCheck,balancePayment } from '@/api/request'

export default{
    data(){
        return{
            winHeight:null,
            height:144,
            selectFoods:null,
            date: '2000-09-01',             // 期望到货日期
            dates: '2000-09-01 12:00:00',   // 提交微信支付
            information:{
                address:'',
                linkman:'',
                phone:''
            },
            visiblePay:false,               // 支付列表
            actionsPay: [
                {
                    name: '微信',
                    color: '#2d8cf0'
                },
                {
                    name: '余额',
                    color: '#19be6b'
                }
            ],
            prepay_id:{
                billNo:'',
                paymentAmt:'',
                id:''
            },                              // 订单号  支付时使用
            OPENID:{}
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
            if(item.qty){
                item.count = item.qty;
            }
            item.individualPrice = (Number(item.count * item.shippingPrice)).toFixed(2);
        })
        this.selectFoods = selectFoods;
        this.winHeight = info.windowHeight;
        this.dates = publicaa.formatTime(myDate);
        this.date = publicaa.littleTime(myDate)
        this.information.address = userInfo.address;
        this.information.linkman = userInfo.linkman;
        this.information.phone = userInfo.phone;
    },
    methods:{
        bindDateChange: function(e) {
            this.date = e.mp.detail.value;
        },
        showPayList(e){
            const index = e.mp.detail.index;
            if (index === 0) {
                this.wxPay();
            }else if(index === 1){
                this.balancePay();
            }
            this.visiblePay = false;
        },
        // 提交订单
        sub(){
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
                        "hopeDate":this.dates,
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

            submitOrder(data).then(res=>{
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
                        wx.redirectTo({
                          url: '../operatingResults/main?pay=1'
                        })
                    }else if(res.data[0].needToPay == true){
                        this.prepay_id = res.data[0];          //查看提交订单后返回的数据 唯一订单号  支付时使用
                        this.getopenID();                      // 获取openID
                        this.visiblePay = true;
                    }
                }else{
                    $Message({
                        content: res.errmsg,
                        type: 'error'
                    });
                }
            })
        },
        getopenID(){
            let _this = this;
            let userInfo = wx.getStorageSync('userInfo');
            wx.login({
                success: function(res) {
                    if (res.code) {
                        let data = {
                            "data":[res.code],
                            "pagination":null,
                            "store_id": userInfo.storeId,
                            "tenancy_id": userInfo.tenancyId,
                            "userCode": userInfo.userCode,
                            "userName": userInfo.userName,
                            "useriId": userInfo.userId
                        }

                        loginCredentialsCheck(data).then(res=>{
                            if(res.errcode == 0){
                                _this.OPENID = res.data[0];
                            }else{
                                $Message({
                                    content: res.errmsg,
                                    type: 'error'
                                });
                            }
                        })
                    }
                }
            });
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
                    setTimeout(()=>{
                        wx.reLaunch({
                          url: '../operatingResults/main?pay=1'
                        })
                    },1000)
                }else{
                    this.visiblePay = false;
                    $Message({
                        content: res.errmsg,
                        type: 'error'
                    });
                }
            })
        },
        // 微信支付
        wxPay(){

            let _this = this;
            let userInfo = wx.getStorageSync('userInfo');
            let selectFoods = wx.getStorageSync('selectFoods');
            var timestamp = new Date().getTime().toString();
            let noncestr = publicaa.RndNum(32);
            let selectFoodsName = [];
            selectFoods.map(res=>{
                selectFoodsName.push(res.materialName);
            })
            let data = {
            	"code": 0,
            	"data": [{
                    "subject": userInfo.userName + "用户购买了" + selectFoodsName,
            		"order_no": this.prepay_id.billNo,
            		"bill_num": this.prepay_id.billNo,
            		"pay_type": "wechat_pay",
            		"pos_num": "WEB",
            		"opt_num": "小程序点餐",
            		"amount": this.prepay_id.paymentAmt,
            		"total_amount": this.prepay_id.paymentAmt,
            		"currency": "CNY",
            		"client_ip": "127.0.0.1",
            		"body": "小程序点餐订单支付",
            		"service_type": "dhb08",
            		"channel": "",
            		"report_date": this.dates,
            		"extra": {
            			"all_pay": {
            				"notify_url": "null/notify/tzxstar",
            				"trade_type": "JSAPI",
            				"openid": this.OPENID.openid,
                            // "openid":"ooG07uE9fLtEcoU58gqJwW5AUQCc",
            				"trade_source": "XCX"
            			}
            		}
            	}],
            	"source": "SERVER",
                //"store_id": selectFoods[0].dcId,    //线上用这个测试中心ID
            	"store_id": 0,
            	"tenancy_id": userInfo.tenancyId,
            	"type": "GET_PREPAY_BARCODE"
            }
            wx.request({
                url: 'https://test.e7e6.net/payment/news/post',
                data:data,
                method:'POST',
                success:function(res){
                    let prepayid = res.data.data[0].prepay_id;
                    let stringA="appId=wx059d9caa6935d61a&nonceStr=" + noncestr +"&package=prepay_id=" + prepayid +"&signType=MD5&timeStamp=" + timestamp;
                    let stringSignTemp=stringA+"&key=tzxsaasweixinpay2015101212150000";                     //注：key为商户平台设置的密钥key
                    let sign=md5(stringSignTemp).toUpperCase();                                             //注：MD5签名方式

                    wx.requestPayment({
                        'timeStamp': timestamp,
                        'nonceStr': noncestr,
                        'package': 'prepay_id=' + prepayid,
                        'signType': 'MD5',
                        'paySign': sign,
                        'success':function(res){
                            console.log(res)
                        },
                        'fail':function(res){
                            console.log('接口调用失败的回调函数')
                        },
                        'complete':function(res){
                            console.log('接口调用结束的回调函数（调用成功、失败都会执行）')
                        }
                    })

                }
            })

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
        justify-content: space-between;
        span:nth-child(1){
            padding-left: 56rpx;
        }
        .section{
            display: flex;
            margin-right: 22px;
            .enter{
                margin-left: 10px;
            }
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
