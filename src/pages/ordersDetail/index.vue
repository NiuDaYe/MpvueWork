<template>
    <div class="orderDetail">
        <i-tabs :current="currentTab" @change="handleChange">
            <i-tab key="tab1" title="物品详情"></i-tab>
            <i-tab key="tab2" title="订单信息"></i-tab>
        </i-tabs>

        <div class="times">
            <i-cell-group >
                <i-cell  title="到货日期" value="2018-12-22"></i-cell>
            </i-cell-group>
        </div>


        <scroll-view scroll-y class="cell-list-border" @scrolltolower="lower" :style="'height:'+contentHeight">
            <div class="left" v-if="tabShow">
                <view>
                    <p class="distributionCenter">
                        <span>天子星望京配送中心</span>
                        <!-- <i-icon type="success" size="28" color="#80848f"  /> -->
                        <i-icon type="success_fill" size="28" color="#1c7efb"  />
                    </p>
                    <div class="list">
                        <div class="name"> <span>紫罗兰+巴菲特里</span> <p class="price"><span>￥12.50</span> <span>*10</span> </p> </div>
                        <p class="message"> <i-tag>10公斤/袋</i-tag> <span>￥129</span> </p>
                    </div>
                    <div class="list">
                        <div class="name"> <span>紫罗兰+巴菲特里</span> <p class="price"><span>￥12.50</span> <span>*10</span> </p> </div>
                        <p class="message"> <i-tag>10公斤/袋</i-tag> <span>￥129</span> </p>
                    </div>
                </view>
                <view>
                    <p class="distributionCenter">
                        <span>天子星望京配送中心</span>
                        <!-- <i-icon type="success" size="28" color="#80848f"  /> -->
                        <i-icon type="success_fill" size="28" color="#1c7efb"  />
                    </p>
                    <div class="list">
                        <div class="name"> <span>紫罗兰+巴菲特里</span> <p class="price"><span>￥12.50</span> <span>*10</span> </p> </div>
                        <p class="message"> <i-tag>10公斤/袋</i-tag> <span>￥129</span> </p>
                    </div>
                    <div class="list">
                        <div class="name"> <span>紫罗兰+巴菲特里</span> <p class="price"><span>￥12.50</span> <span>*10</span> </p> </div>
                        <p class="message"> <i-tag>10公斤/袋</i-tag> <span>￥129</span> </p>
                    </div>
                </view>
                <view>
                    <p class="distributionCenter">
                        <span>天子星望京配送中心</span>
                        <!-- <i-icon type="success" size="28" color="#80848f"  /> -->
                        <i-icon type="success_fill" size="28" color="#1c7efb"  />
                    </p>
                    <div class="list">
                        <div class="name"> <span>紫罗兰+巴菲特里</span> <p class="price"><span>￥12.50</span> <span>*10</span> </p> </div>
                        <p class="message"> <i-tag>10公斤/袋</i-tag> <span>￥129</span> </p>
                    </div>
                    <div class="list">
                        <div class="name"> <span>紫罗兰+巴菲特里</span> <p class="price"><span>￥12.50</span> <span>*10</span> </p> </div>
                        <p class="message"> <i-tag>10公斤/袋</i-tag> <span>￥129</span> </p>
                    </div>
                </view>
                <div class="list">
                    <div class="name"> <span>紫罗兰+巴菲特里</span> <p class="price"><span>￥12.50</span> <span>*10</span> </p> </div>
                    <p class="message"> <i-tag>10公斤/袋</i-tag> <span>￥129</span> </p>
                </div>
                <div class="list">
                    <div class="name"> <span>紫罗兰+巴菲特里</span> <p class="price"><span>￥12.50</span> <span>*10</span> </p> </div>
                    <p class="message"> <i-tag>10公斤/袋</i-tag> <span>￥129</span> </p>
                </div>
                <div class="list">
                    <div class="name"> <span>紫罗兰+巴菲特里</span> <p class="price"><span>￥12.50</span> <span>*10</span> </p> </div>
                    <p class="message"> <i-tag>10公斤/袋</i-tag> <span>￥129</span> </p>
                </div>
                <div class="list">
                    <div class="name"> <span>紫罗兰+巴菲特里</span> <p class="price"><span>￥12.50</span> <span>*10</span> </p> </div>
                    <p class="message"> <i-tag>10公斤/袋</i-tag> <span>￥129</span> </p>
                </div>
            </div>

            <div class="right" v-if="!tabShow">

                <div class="header_adreass">
                    <i-icon class="coordinates_fill" type="coordinates_fill" size="24" color="#989898"/>
                    <div class="address_detail">
                        <p> <span>收货人:天子星</span> <span>18500062202</span> </p>
                        <p>收货地址:北京市朝阳区望京科技园</p>
                    </div>
                    <i-icon class="enter" type="enter" size="16"/>
                </div>

                <dl class="orderMesage">
                    <dt>单据信息</dt>
                    <dd> <span>订单号</span> <span>DHCN0007201801300003</span> </dd>
                    <dd> <span>支付金额</span> <span class="pubColor">￥1000.00</span>  </dd>
                    <dd> <span>支付方式</span> <span>微信支付</span> </dd>
                    <dd> <span>下单时间</span> <span>2018-01-10 12:00</span> </dd>
                    <dd> <span>结算方式</span> <span>月结</span> </dd>
                </dl>

            </div>

        </scroll-view>

        <div class="checkOrderBottom">
            <div class="price">
                <p>&nbsp;&nbsp;&nbsp;合计： <span>￥0</span> </p>
                <p>待支付：<span>￥0</span> </p>
            </div>
            <div class="btn">去支付</div>
        </div>

    </div>
</template>

<script>
import wxp from 'minapp-api-promise'

export default{
    data(){
        return{
            currentTab: 'tab1',
            winHeight:null,
            tabShow:true,
            current:'苹果',
            fruit: [{
                id: 1,
                name: '香蕉',
            }, {
                id: 2,
                name: '苹果'
            }, {
                id: 3,
                name: '西瓜'
            }, {
                id: 4,
                name: '葡萄',
            }],
        }
    },
    methods:{
        handleChange (detail) {
            this.currentTab = detail.mp.detail.key;
            if(this.currentTab == "tab1"){
                console.log('这是物品详情');
                this.tabShow = true;
            }else if(this.currentTab == "tab2"){
                console.log('这是订单信息');
                this.tabShow = false;
            }
        },
        handleFruitChange(detail = {}){
            this.current = detail.value
        }
    },
    async onLoad() {
        let info = await wxp.getSystemInfo();
        this.winHeight = info.windowHeight;
        await wxp.setNavigationBarTitle({
          title: '订单详情'
        })
    },
    computed: {
        contentHeight(){
            if (this.winHeight) {
                return this.winHeight - 150 + 'px'
            }
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
        width: 100%;
        height: 100rpx;
        border-top: 1px solid #cccccc;
        display: flex;
        justify-content:space-between;
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
            border-bottom: 1px solid #e4e4e4;
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
            border-bottom: 1px solid #e4e4e4;
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
