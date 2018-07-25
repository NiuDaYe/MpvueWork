<template >
    <div class="join-car">
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
        </div>

        <transition name="fade">
            <div class="maskLayer" v-if="listShow" :animation='animationBg' @click="hideCart"></div>
        </transition>

        <transition name="fold">
            <div class="join-car-list" v-show="listShow" :animation='animationData'>
                <scroll-view scroll-y class="cell-list-border">
                    <div class="hoin-title">
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
        </transition>

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
            animationData:{},
            animationBg:{}
        }
    },
    components:{
        cartcontrols,
    },
    methods:{
        // 购物车显隐事件
        toggleList(){
            let that = this;
            if (!that.totalCount){
                return;
            }
            this.animations();
        },
        // 点阴影隐藏购物车
        hideCart(){
            this.animations()
        },
        // 清空购物车
        empty() {
            this.selectFoods.forEach((food) => {
              food.count = 0;
            });
        },
        // 去下单
        toPAY(){
            let selectFoods = wx.setStorageSync('selectFoods',this.selectFoods);
            this.$emit('ievent','');
            wx.navigateTo({
              url: '../../pages/checkOrder/main'
            })
        },
        animations(){
           let that = this;
           let animation  = wx.createAnimation({
               duration:300,
               timingFunction:'ease'
            })

            let animationBg  = wx.createAnimation({
                duration:300,
                timingFunction:'ease'
             })

            that.animation = animation
            animation.translateY(320).step()
            that.animationData = animation.export()

            that.animationBg = animationBg
            animationBg.opacity(0).step()
            that.animationBg = animationBg.export()

           if(this.fold == true){
               that.fold = false;
               setTimeout(function () {
                 animation.translateY(0).step()
                 that.animationData = animation.export()
               }, 200)

               setTimeout(function () {
                 animationBg.opacity(1).step()
                 that.animationBg = animationBg.export()
               }, 200)

           }else if(this.fold == false){
               setTimeout(function () {
                 animation.translateY(0).step()
                 that.animationData = animation.export()
                 that.fold = true
               }, 200)
               setTimeout(function () {
                 animationBg.opacity(0).step()
                 that.animationBg = animationBg.export()
               }, 200)
           }
       }
    },
    computed:{
        // 总价
        totalPrice(){
            let total = 0;
            this.selectFoods.map((food)=>{
                if(!food.count){
                    Vue.set(this.selectFoods,'count',0)
                }else{
                    let rel = (food.shippingPrice * food.count).toFixed(2);
                    total +=  Number(rel);
                }
            })
            return total;
        },
        // 数量总和
        totalCount(){
            let count = 0;
            this.selectFoods.map((food)=>{
                if(!food.count){
                    Vue.set(this.selectFoods,'count',0)
                }else{
                    count += Number(food.count);
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
    z-index: 13;
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
    position: fixed;
    left: 0;
    bottom:0;
    z-index: 3;
    width: 100%;
    .cell-list-border{
        .dele-all{
            text-align: right;
            font-size: 32rpx;
            padding-top: 16rpx;
            padding-right: 16rpx;
        }
        max-height: 600rpx;
        position: fixed;
        bottom: 120rpx;
        background: #fff;
        width: 100%;
        z-index: 2;
        overflow: hidden;
    }
    .cell-list{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f0f5f8;
        margin-left: 10rpx;
        .cell-left{
            width: 60%;
            padding: 20rpx 0;
            .name{
                font-size: 33rpx;
            }
            .unit{
                font-size: 26rpx;
                padding-top: 6rpx;
                span{
                    color: #fc8884;
                }
            }
        }
    }
}
</style>
