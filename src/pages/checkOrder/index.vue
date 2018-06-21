<!-- 核对订单页面 -->
<template >
    <div class="checkOrder" >

        <div class="header">
            <div class="header_adreass">
                <i-icon class="coordinates_fill" type="coordinates_fill" size="24" color="#989898"/>
                <div class="address_detail">
                    <p> <span>收货人:天子星</span> <span>18500062202</span> </p>
                    <p>收货地址:北京市朝阳区望京科技园</p>
                </div>
                <i-icon class="enter" type="enter" size="16"/>
            </div>

            <div class="expectData">
                <span>期望到货日期</span>
                <span>2018-12-22</span>
                <i-icon class="enter" type="enter" size="16"/>
            </div>
        </div>

        <scroll-view scroll-y class="cell-list-border" @scrolltolower="lower" :style="'height:'+contentHeight">
            
            <div class="detailsList">
                <p class="distributionCenter">北京配送中心</p>
                <div class="details">
                    <p> <span class="fontOne">猪肉大葱(箱)</span> <span>￥10.50箱</span> </p>
                    <p> <span>10公斤/箱</span> <span>*1</span> </p>
                    <p> <span></span>  <span class="fontOne">￥10.50</span> </p>
                </div>
            </div>

            <div class="detailsList">
                <p class="distributionCenter">北京配送中心</p>
                <div class="details">
                    <p> <span class="fontOne">猪肉大葱(箱)</span> <span>￥10.50箱</span> </p>
                    <p> <span>10公斤/箱</span> <span>*1</span> </p>
                    <p> <span></span>  <span class="fontOne">￥10.50</span> </p>
                </div>
            </div>

            <div class="detailsList">
                <p class="distributionCenter">北京配送中心</p>
                <div class="details">
                    <p> <span class="fontOne">猪肉大葱(箱)</span> <span>￥10.50箱</span> </p>
                    <p> <span>10公斤/箱</span> <span>*1</span> </p>
                    <p> <span></span>  <span class="fontOne">￥10.50</span> </p>
                </div>
            </div>

            <div class="detailsList">
                <p class="distributionCenter">北京配送中心</p>
                <div class="details">
                    <p> <span class="fontOne">猪肉大葱(箱)</span> <span>￥10.50箱</span> </p>
                    <p> <span>10公斤/箱</span> <span>*1</span> </p>
                    <p> <span></span>  <span class="fontOne">￥10.50</span> </p>
                </div>
            </div>

            <div class="detailsList">
                <p class="distributionCenter">北京配送中心</p>
                <div class="details">
                    <p> <span class="fontOne">猪肉大葱(箱)</span> <span>￥10.50箱</span> </p>
                    <p> <span>10公斤/箱</span> <span>*1</span> </p>
                    <p> <span></span>  <span class="fontOne">￥10.50</span> </p>
                </div>
            </div>

            <div class="detailsList">
            <p class="distributionCenter">北京配送中心</p>
            <div class="details">
                <p> <span class="fontOne">猪肉大葱(箱)</span> <span>￥10.50箱</span> </p>
                <p> <span>10公斤/箱</span> <span>*1</span> </p>
                <p> <span></span>  <span class="fontOne">￥10.50</span> </p>
            </div>
        </div>

        </scroll-view>

        <div class="checkOrderBottom">
            <div class="price">
                <p>&nbsp;&nbsp;&nbsp;合计： <span>￥0</span> </p>
                <p>待支付：<span>￥0</span> </p>
            </div>
            <div class="btn">
                提交订单
            </div>
        </div>

    </div>
</template>

<script>
import wxp from 'minapp-api-promise'

export default{
    data(){
        return{
            winHeight:null,
            height:150,
        }
    },
    async onLoad() {
        let info = await wxp.getSystemInfo();
        this.winHeight = info.windowHeight;
        await wxp.setNavigationBarTitle({
          title: '核对订单'
        })
    },
    methods:{
        lower(){

        }
    },
    computed: {
        contentHeight(){
            if (this.winHeight) {
                return this.winHeight - this.height + 'px'
            }
        }
    },
}
</script>

<style scoped lang="scss">
.checkOrder{
    background: #f2f2f2;
    .header_adreass{
        display:flex;
        border-bottom: 1rpx solid #e4e4e4;
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
        display: inline-block;
        width: 100%;
        font-size: 28rpx;
        padding-top: 20rpx;
        padding-bottom: 20rpx;
        border-bottom: 8rpx solid #ccc;
        background: #fff;
        span:nth-child(1){
            padding-left: 60rpx;
        }
        span:nth-child(2){
            padding-left: 296rpx;
        }

    }

    .detailsList{
        border-bottom: 1px solid #e4e4e4;
        border-top: 1px solid #e4e4e4;
        margin-top: 12rpx;
        background: #fff;
        .distributionCenter{
            text-indent: 2em;
            border-bottom: 1px solid #e4e4e4;
            font-size: 26rpx;
            line-height: 58rpx;
        }
        .details{
            padding-top: 20rpx;
            padding-bottom: 16rpx;
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
                    color: #333333;
                }
            }
        }
    }

    .checkOrderBottom{
        width: 100%;
        height: 100rpx;
        border-top: 1px solid #cccccc;
        display: flex;
        justify-content:flex-end;
        position: fixed;
        bottom:0;
        background: #ffffff;
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
