<template >
    <div class="join-car">
        <div class="price" @tap="showHideCar">
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
</template>

<script>
import Vue from 'vue'

export default{
    props:{
        list:{
            type:Array,
            default(){
                return [];
            }
        },
        totals:0,
        counts:0,
    },
    computed:{
        // 总价
        totalPrice(){
            let total = 0;
            let _this = this;
            this.list.map((food)=>{
                if(!food.count){
                    Vue.set(this.list,'count',0)
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
            this.list.map((food)=>{
                if(!food.count){
                    Vue.set(this.list,'count',0)
                }else{
                    count += food.count;
                }
            })
            return count;
        },

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
</style>
