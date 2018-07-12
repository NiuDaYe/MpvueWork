<!-- 操作结果页面 -->
<template>
    <div class="orderResult">
        <div class="fail pubClass" v-if="pay == 2">
            <icon type="cancel" size="40" color="red"/>
            <p class="type">下单失败</p>
            <p class="text">支付银行卡余额不足</p>
            <div class="returnLast btn" @click="returnPage">返回上级页面</div>
        </div>

        <div class="success pubClass" v-else>
            <icon type="success" size="40" color="#1a9bfc"/>
            <p class="type">下单成功</p>
            <p class="text">订单已提交，欢迎再次采购</p>
            <div class="lookOrderList btn" @click="vieworder">查看订单</div>
            <p class="returnOrderList" @click="returnGoodsList">返回商品列表</p>
            <p class="returnOrderList" @click="returnOrderList">返回订单列表</p>
        </div>

    </div>
</template>

<script>
import wxp from 'minapp-api-promise'

export default{
    data(){
        return{
            pay:null
        }
    },
    async onLoad(option) {
        this.pay = option.pay;
        await wxp.setNavigationBarTitle({
          title: '操作结果'
        })
    },
    methods:{
        returnPage(){
            wx.navigateBack({
              delta: 1
            })
        },
        returnGoodsList(){
            wx.reLaunch({
              url: '../goods/main'
            })
        },
        returnOrderList(){
            wx.reLaunch({
              url: '../orders/main'
            })
        },
        vieworder(){
            wx.navigateTo({
              url: '../ordersDetail/main'
            })
        }
    }

}
</script>

<style scoped lang="scss">
.orderResult{
    width: 500rpx;
    height: 100%;
    margin:0 auto;
    .pubClass{
        width: 100%;
        text-align: center;
        margin-top: 140rpx;
        .type{
            color: #666666;
            font-size: 50rpx;
            margin-top: 50rpx;
        }
        .text{
            color: #999999;
            font-size: 34rpx;
            margin-top: 20rpx;
            margin-bottom: 70rpx;
        }
        .btn{
            width: 100%;
            height: 80rpx;
            line-height: 80rpx;
            border:1px solid #e6e6e6;
            font-size: 34rpx;
        }
        .returnOrderList{
            margin-top: 60rpx;
            font-size: 34rpx;
        }
    }
}
</style>
