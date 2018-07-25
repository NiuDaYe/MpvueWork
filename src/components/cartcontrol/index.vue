<template>
    <div class="cell-right">
        <span @click="addCart" class="icon-add cart-add"></span>
        <input type="number"  v-show="list.count>0" class="write-number" v-model="list.count" placeholder="0" >
        <div class="cart-decrease" :animation='animationData' v-show="list.count>0" @click.stop.prevent="reduceCart">
            <span class="inner icon-remove"></span>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'

    export default{
        props:{
            list:{
                type:Object
            }
        },
        data(){
            return {
                animationData: {}
            }
        },
        methods:{
            addCart(){
                if(!this.list.count){
                    Vue.set(this.list,'count',1);
                    this.box = true;
                    let animation  = wx.createAnimation({duration:100,timingFunction:'linear'})
                    this.animation = animation
                    animation.opacity(0).step()
                    this.animationData = animation.export(),
                    setTimeout(()=>{
                        animation.opacity(1).step()
                        this.animationData = animation.export()
                    },200)
                }else{
                    this.list.count ++;
                }
            },
            reduceCart(){
                if(this.list.count){
                    this.list.count --;
                }
            },
        },
    }
</script>

<style scoped lang="scss">
.cell-right{
    color:#495060;
    font-size: 28rpx;
    width: 200rpx;
    display: flex;
    margin-top: 12rpx;
    padding-right: 12rpx;
    padding-top: 20rpx;
    display: flex;
    flex-direction:row-reverse;
    .write-number{
        text-align: center;
        height: 60rpx;
        line-height: 60rpx;
        width: 80rpx;
    }
    .cart-add,.cart-decrease{
        width: 30px;
        height: 30px;
        line-height: 26px;
        border-radius: 50%;
        border: 1px solid #dddee1;
        text-align: center;
        font-size: 44rpx;
        font-weight: bold;
    }
    .cart-add{
        color: #fff;
        background: #1e84ec;
        border:none;
    }
    .cart-decrease{
        opacity: 1;
        color: #1e84ec;
        .inner{
            line-height: 24px;
            font-size: 24px;

        }
    }
}
.icon-remove:before{
    content: "-"
}
.icon-add:before{
    content: "+"
}
</style>
