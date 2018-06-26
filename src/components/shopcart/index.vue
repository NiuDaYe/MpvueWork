<template >
    <div class="join-car">
        <div class="price" @tap="toggleList">
            <i-badge :count="totalCount">
                <template v-if="totalCount > 0">
                    <i-icon size="38" type="publishgoods_fill" color="#1e84ec"/>
                </template>
                <template v-else>
                    <i-icon size="38" type="publishgoods_fill" />
                </template>
            </i-badge>
            <template v-if="totalPrice != null">
                {{totalPrice}} 元
            </template>
        </div>
        <template v-if="totalCount > 0">
            <p class="settlement settlementActive" @click="toPAY">去结算</p>
        </template>
        <template v-else>
            <p class="settlement">请选购</p>
        </template>

        <div class="maskLayer" v-if="listShow" @click="hideCart"></div>

        <div class="join-car-list" v-show="listShow" transition="fade">
            <scroll-view scroll-y class="cell-list-border">
                <div class="hoin-title">
                    <!-- <h1>购物车</h1> -->
                    <p class="dele-all" @click="empty">清空购物车</p>
                </div>

                <div class="cell-list" v-for="item in selectFoods" wx:key="key">
                    <div class="cell-left">
                        <p class="name">{{item.materialName}}</p>
                        <p class="unit"> <span>￥{{item.shippingPrice}}</span>/{{item.unitName}} </p>
                    </div>
                    <cartcontrols :list="item"> </cartcontrols>
                </div>

            </scroll-view>
        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import cartcontrols from '@/components/cartcontrol/index'

export default{
    props:{
        selectFoods:{
            type:Array,
            default(){
                return [];
            }
        },
    },
    data(){
        return {
            fold:true,
        }
    },
    components:{
        cartcontrols,
    },
    methods:{
        // 购物车显隐事件
        toggleList(){
            if (!this.totalCount){
                return;
            }
            this.fold = !this.fold;
        },
        // 点阴影隐藏购物车
        hideCart(){
            this.fold = !this.fold;
        },
        //清空购物车
        empty() {
            this.selectFoods.forEach((food) => {
              food.count = 0;
            });
      },
    },
    computed:{
        // 总价
        totalPrice(){
            let total = 0;
            let _this = this;
            this.selectFoods.map((food)=>{
                if(!food.count){
                    Vue.set(this.selectFoods,'count',0)
                }else{
                    total += food.shippingPrice * food.count;
                }
            })
            return total;
        },
        // 数量总和
        totalCount(){
            let count = 0;
            let _this = this;
            this.selectFoods.map((food)=>{
                if(!food.count){
                    Vue.set(this.selectFoods,'count',0)
                }else{
                    count += food.count;
                }
            })
            return count;
        },
        // 计算显隐
        listShow(){
            if(!this.totalCount > 0){
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            return show;
        }
    }
}
</script>

<style lang="scss">
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
    .settlementActive{
        background: #1e84ec;
        color: #fff;
    }
}
.maskLayer{
    position: fixed;
    width: 100%;
    height: 90%;
    left:0;
    top:0;
    z-index: 1;
    opacity: 1;
    background: rgba(7,17,27,0.6);
}
.join-car-list{
    position: absolute;
    left: 0;
    top:0;
    z-index: 3;
    width: 100%;
    .cell-list-border{
        .dele-all{
            text-align: right;
            font-size: 32rpx;
            padding-top: 16rpx;
            padding-right: 16rpx;
        }
        max-height: 500rpx;
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
        padding-bottom: 14rpx;
        .cell-left{
            width: 60%;
            .name{
                font-size: 30rpx;
            }
            .unit{
                font-size: 24rpx;
                span{
                    color: #fc8884;
                }
            }
        }
    }
}

&.fade-transition
    transition:all 0.1s
    opacity:1
    background:rgba(240,20,20,0.5)
&.fade-enter,&.fade-leave
    opacity:0
    background:rgba(240,20,20,0)
</style>
