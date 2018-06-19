<!-- 产品页面 -->
<template>
    <div class="googs">
        <div class="search">
            <input type="text" placeholder="请输入物品名称" :value="searchName">
            <i-icon size="22" type="search" class="icon-search" />
        </div>

        <div class="menu">
            <i-col span="6" class="col-class" >
                <scroll-view scroll-y class="left-con" :style="'height:'+contentLeftHeight" >
                    <div class="telmp" v-for="(item,index) in list">
                        <p>{{item.message}}</p>
                    </div>
                </scroll-view>
            </i-col>

            <i-col span="18" class="col-class">
                <div class="show-tittle">
                    蔬菜类
                </div>
                <scroll-view scroll-y class="cell-list-border" @scrolltolower="lower" :style="'height:'+contentRightHeight">
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-left">
                            <p class="name">黄豆</p>
                            <p class="unit"> <span>￥534.11</span>/袋 </p>
                        </div>

                        <div class="cell-right">
                            <span> - </span>
                            <input type="text" class="write-number" :value="value" placeholder="数量" >
                            <span> + </span>
                        </div>
                    </div>
                </scroll-view>
            </i-col>
        </div>

        <div class="join-car">
            <div class="price" @tap="showHideCar">
                <i-icon size="38" type="publishgoods_fill" />
                ￥230000.00
            </div>
            <p class="settlement">去结算</p>
        </div>

        <div class="maskLayer" v-if="showFalse" @click="hideCar"></div>
        <div class="join-car-list" v-show="showFalse">
            <scroll-view scroll-y class="cell-list-border">
                <p class="dele-all">清空购物车</p>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
            </scroll-view>
        </div>

    </div>
</template>

<script>
import wxp from 'minapp-api-promise'

export default{
    data(){
        return{
            showFalse:false,
            searchName:'',
            value:"1",
            jiage:'20',
            winHeight:null,
            height: 52,
            list:[
                { message: '坚果' },
                { message: '蔬菜' },
                { message: '粮油' },
                { message: '大米' },
                { message: '土豆' },
                { message: '玉米' },
                { message: '宝马' },
                { message: '奔驰' },
                { message: '宝来' },
                { message: '玛莎拉蒂' },
                { message: '坚果' },
                { message: '蔬菜' },
                { message: '粮油' },
                { message: '大米' },
                { message: '土豆' },
                { message: '玉米' },
                { message: '宝马' },
                { message: '奔驰' },
                { message: '宝来' },
                { message: '玛莎拉蒂' },
                { message: '坚果' },
                { message: '蔬菜' },
                { message: '粮油' },
                { message: '大米' },
                { message: '土豆' },
                { message: '玉米' },
                { message: '宝马' },
                { message: '奔驰' },
                { message: '宝来' },
                { message: '玛莎拉蒂' },
                { message: '坚果' },
                { message: '蔬菜' },
                { message: '粮油' },
                { message: '大米' },
                { message: '土豆' },
                { message: '玉米' },
                { message: '宝马' },
                { message: '奔驰' },
                { message: '宝来' },
                { message: '玛莎拉蒂' },
            ]
        }
    },
    methods:{
        showHideCar(){
            this.showFalse = !this.showFalse;
        },
        hideCar(){
            this.showFalse = false;
        },
        lower(){
            console.log('到底了');
        }
    },
    async onLoad() {
        let info = await wxp.getSystemInfo();
        this.winHeight = info.windowHeight;
        await wxp.setNavigationBarTitle({
          title: '要货'
        })
    },
    computed: {
        contentLeftHeight() {
            if (this.winHeight) {
                return this.winHeight - 40 - this.height + 'px'
            }
        },
        contentRightHeight(){
            if (this.winHeight) {
                return this.winHeight - 58 - this.height + 'px'
            }
        }
    },
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.googs{
    color:#495060;
    .search{
        width: 90%;
        margin:0 auto;
        height: 60rpx;
        color: #ccc;
        position: relative;
        input{
            border:1px solid #ccc;
            border-top-left-radius: 30rpx;
            border-top-right-radius: 30rpx;
            border-bottom-left-radius: 30rpx;
            border-bottom-right-radius: 30rpx;
            padding-top: 4rpx;
            line-height: 38rpx;
            width: 90%;
            font-size: 32rpx;
            color: #808080;
            padding-left: 2.4em;
        }
        .icon-search{
            position: absolute;
            top:0;
            left:8rpx;
        }
    }
    .menu{
        .left-con{
            width: 100%;
            background: #ecf2fe;
            margin-top: 20rpx;
            padding-top: 20rpx;
            p{
                height: 80rpx;
                line-height: 36rpx;
                font-size: 30rpx;
                padding-left: 32rpx;
                color: #2e537f;
            }
        }
        .show-tittle{
            width: 100%;
            height: 60rpx;
            line-height: 60rpx;
            margin-top: 20rpx;
            background: #f8f8f9;
            color: #495060;
            font-size: 28rpx;
            text-indent: 1em;
        }
        .cell-list{
            float: right;
            display: flex;
            justify-content:space-between;
            width: 94%;
            font-size: 32rpx;
            border-bottom: 1px solid #e9eaec;
            color:#495060;
            margin-top: 20rpx;
            .cell-left{
                width: 60%;
                .name{
                    font-size: 36rpx;
                }
                .unit{
                    font-size: 24rpx;
                    span{
                        color: #fc8884;
                    }
                }
            }
            .cell-right{
                width: 40%;
                display: inline-flex;
                margin-top: 12rpx;
                padding-right: 12rpx;
                .write-number{
                    text-align: center;
                    height: 60rpx;
                    line-height: 60rpx;
                }
                span{
                    display: block;
                    width: 220rpx;
                    height: 60rpx;
                    line-height: 56rpx;
                    border-radius: 50%;
                    border: 1px solid #dddee1;
                    text-align: center;
                    font-size: 44rpx;
                    font-weight: bold;
                }
                span:nth-child(1){
                    color: #1e84ec;
                }
                span:nth-child(3){
                    color: #fff;
                    background: #1e84ec;
                    border:none;
                }
            }
        }
    }
    .join-car{
        width: 100%;
        height: 120rpx;
        background: #f8f8f9;
        position: fixed;
        bottom: 0;
        z-index: 3;
        display: flex;
        justify-content:space-between;
        .price{
            height: 120rpx;
            line-height: 120rpx;
            width: 69%;
        }
        .settlement{
            height: 120rpx;
            width: 30%;
            line-height: 120rpx;
            padding-right: 16rpx;
            border-left: 1px solid #dddee1;
            text-align: center;
        }
    }
    .join-car-list{
        .cell-list-border{
            .dele-all{
                text-align: right;
                font-size: 32rpx;
                padding-top: 16rpx;
                padding-right: 16rpx;
            }
            height: 600rpx;
            position: fixed;
            bottom: 120rpx;
            background: #fff;
            width: 100%;
            z-index: 3;
            overflow: hidden;
        }
        .cell-list{
            float: right;
            display: flex;
            justify-content:space-between;
            width: 98%;
            font-size: 32rpx;
            border-bottom: 1px solid #e9eaec;
            color:#495060;
            margin-top: 20rpx;
            padding-left: 2%;
            overflow: hidden;

            .cell-left{
                width: 60%;
                .name{
                    font-size: 36rpx;
                }
                .unit{
                    font-size: 24rpx;
                    span{
                        color: #fc8884;
                    }
                }
            }
            .cell-right{
                width: 24%;
                display: inline-flex;
                margin-top: 12rpx;
                padding-right: 12rpx;
                .write-number{
                    text-align: center;
                    height: 60rpx;
                    line-height: 60rpx;
                }
                span{
                    display: block;
                    width: 400rpx;
                    height: 60rpx;
                    line-height: 56rpx;
                    border-radius: 50%;
                    border: 1px solid #dddee1;
                    text-align: center;
                    font-size: 44rpx;
                    font-weight: bold;
                }
                span:nth-child(1){
                    // color: #1e84ec;
                }
                span:nth-child(3){
                    color: #3b3a2e;
                    background: #fece6a;
                    border:none;
                }
            }
        }
    }
    .maskLayer{
        position: fixed;
        width: 100%;
        height: 100%;
        left:0;
        top:0;
        background: #000;
        opacity: .4;
        z-index: 2;
    }




}
</style>
