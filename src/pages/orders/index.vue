<template>
    <div class="orders">

        <view class="currentTab">
            <i-tabs :current="currentTab" @change="handleChangeTab">
                <i-tab key="tab1" title="待支付"></i-tab>
                <i-tab key="tab2" title="待发货"></i-tab>
                <i-tab key="tab3" title="待收货"></i-tab>
                <i-tab key="tab4" title="售后/退货"></i-tab>
            </i-tabs>
        </view>

        <scroll-view scroll-y class="cell-list-border" @scrolltolower="lower" :style="'height:'+contentHeight">
            <div class="orderList">

                <view class="list">
                    <p class="times">2018-05-09 12:30</p>
                    <div class="content">
                        <p class="payState"> <span>DD33782827829182934</span> <span class="pubColor">待支付</span> </p>
                        <p class="abstract">物品摘要：紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥1000.00</span> </p>
                            <span>取消订单</span>
                            <span class="pubClass">去支付</span>
                        </div>
                    </div>
                </view>

                <view class="list">
                    <p class="times">2018-05-09 12:30</p>
                    <div class="content">
                        <p class="payState"> <span>DD33782827829182934</span> <span class="pubColor">待支付</span> </p>
                        <p class="abstract">物品摘要：紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥1000.00</span> </p>
                            <span>取消订单</span>
                            <span class="pubClass">去支付</span>
                        </div>
                    </div>
                </view>

                <view class="list">
                    <p class="times">2018-05-09 12:30</p>
                    <div class="content">
                        <p class="payState"> <span>DD33782827829182934</span> <span class="pubColor">待支付</span> </p>
                        <p class="abstract">物品摘要：紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥1000.00</span> </p>
                            <span>取消订单</span>
                            <span class="pubClass">去支付</span>
                        </div>
                    </div>
                </view>

                <view class="list">
                    <p class="times">2018-05-09 12:30</p>
                    <div class="content">
                        <p class="payState"> <span>DD33782827829182934</span> <span class="pubColor">待支付</span> </p>
                        <p class="abstract">物品摘要：紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥1000.00</span> </p>
                            <span>取消订单</span>
                            <span class="pubClass">去支付</span>
                        </div>
                    </div>
                </view>

                <view class="list">
                    <p class="times">2018-05-09 12:30</p>
                    <div class="content">
                        <p class="payState"> <span>DD33782827829182934</span> <span class="pubColor">待支付</span> </p>
                        <p class="abstract">物品摘要：紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥1000.00</span> </p>
                            <span>取消订单</span>
                            <span class="pubClass">去支付</span>
                        </div>
                    </div>
                </view>

                <view class="list">
                    <p class="times">2018-05-09 12:30</p>
                    <div class="content">
                        <p class="payState"> <span>DD33782827829182934</span> <span class="pubColor">待支付</span> </p>
                        <p class="abstract">物品摘要：紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥1000.00</span> </p>
                            <span>取消订单</span>
                            <span class="pubClass">去支付</span>
                        </div>
                    </div>
                </view>

                <view class="list">
                    <p class="times">2018-05-09 12:30</p>
                    <div class="content">
                        <p class="payState"> <span>DD33782827829182934</span> <span class="pubColor">待支付</span> </p>
                        <p class="abstract">物品摘要：紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥1000.00</span> </p>
                            <span>取消订单</span>
                            <span class="pubClass">去支付</span>
                        </div>
                    </div>
                </view>

                <view class="list">
                    <p class="times">2018-05-09 12:30</p>
                    <div class="content">
                        <p class="payState"> <span>DD33782827829182934</span> <span class="pubColor">待支付</span> </p>
                        <p class="abstract">物品摘要：紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥1000.00</span> </p>
                            <span>取消订单</span>
                            <span class="pubClass">去支付</span>
                        </div>
                    </div>
                </view>

                <view class="list">
                    <p class="times">2018-05-09 12:30</p>
                    <div class="content">
                        <p class="payState"> <span>DD33782827829182934</span> <span class="pubColor">待支付</span> </p>
                        <p class="abstract">物品摘要：紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥1000.00</span> </p>
                            <span>取消订单</span>
                            <span class="pubClass">去支付</span>
                        </div>
                    </div>
                </view>

                <view class="list">
                    <p class="times">2018-05-09 12:30</p>
                    <div class="content">
                        <p class="payState"> <span>DD33782827829182934</span> <span class="pubColor">待支付</span> </p>
                        <p class="abstract">物品摘要：紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥1000.00</span> </p>
                            <span>取消订单</span>
                            <span class="pubClass">去支付</span>
                        </div>
                    </div>
                </view>

                <view class="list">
                    <p class="times">2018-05-09 12:30</p>
                    <div class="content">
                        <p class="payState"> <span>DD33782827829182934</span> <span class="pubColor">待支付</span> </p>
                        <p class="abstract">物品摘要：紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰紫罗兰啊紫罗兰</p>
                        <div class="money">
                            <p>订单金额:<span class="pubColor">￥1000.00</span> </p>
                            <span>取消订单</span>
                            <span class="pubClass">去支付</span>
                        </div>
                    </div>
                </view>



            </div>
        </scroll-view>

        <div class="currentBar">
            <i-tab-bar :current="currentBar" @change="handleChangeBar">
                <i-tab-bar-item key="createtask" icon="createtask" current-icon="createtask_fill" title="商品"></i-tab-bar-item>
                <i-tab-bar-item key="document" icon="document" current-icon="document_fill" title="订单"></i-tab-bar-item>
                <i-tab-bar-item key="dynamic" icon="dynamic" current-icon="dynamic_fill" title="报表"></i-tab-bar-item>
                <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" dot title="我的"></i-tab-bar-item>
            </i-tab-bar>
        </div>

    </div>
</template>

<script>
import wxp from 'minapp-api-promise'

export default{
    data(){
        return{
            currentTab: 'tab1',
            currentBar:'createtask',
            winHeight:null
        }
    },
    methods:{
        handleChangeTab (detail) {
            this.currentTab = detail.mp.detail.key;
            if(this.currentTab == "tab1"){
                console.log('这是待支付列表');
            }else if(this.currentTab == "tab2"){
                console.log('这是待发货列表');
            }else if(this.currentTab == "tab3"){
                console.log('这是待收货列表');
            }else if(this.currentTab == "tab4"){
                console.log('这是售后退货');
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
        lower(){

        }
    },
    async onLoad() {
        let info = await wxp.getSystemInfo();
        this.winHeight = info.windowHeight;
        await wxp.setNavigationBarTitle({
          title: '订单'
        })
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
                    padding:20rpx 10rpx;
                    border-top:1px solid #f2f2f2;
                    height: 60rpx;
                    line-height: 60rpx;
                    .pubClass{
                        border:1px solid #f2f2f2;
                        width:100rpx;
                        height: 60rpx;
                        text-align: center;
                        line-height: 60rpx;
                        border-radius: 6rpx;
                    }
                }
            }
        }
    }
}

</style>
