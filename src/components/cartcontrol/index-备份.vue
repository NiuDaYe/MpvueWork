<template>
    <div class="cell-right">
        <span @click="reduceCart" v-show="list.count>0"> - </span>
        <input type="number"  v-show="list.count>0" class="write-number" v-model="list.count" placeholder="0" >
        <span @click="addCart"> + </span>
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
        methods:{
            addCart(){
                if(!this.list.count){
                    Vue.set(this.list,'count',1);
                    this.box = true;
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
    .write-number{
        text-align: center;
        height: 60rpx;
        line-height: 60rpx;
        width: 80rpx;
    }
    span{
        width: 30px;
        height: 30px;
        line-height: 26px;
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
</style>
