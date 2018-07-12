<template>
    <div class="cell-right">
        <span @click="reduceCart"> - </span>
        <input type="number" class="write-number" @change="writeNumber" :value="list.count" placeholder="0" >
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
        data(){
            return{
                aa:{}
            }
        },
        async onLoad() {
            this.aa = this.list;
            console.log('this.aa',this.aa);
        },
        methods:{
            addCart(){
                if(!this.list.count){
                    Vue.set(this.list,'count',1)
                }else{
                    this.list.count ++;
                }
            },
            reduceCart(){
                if(this.list.count){
                    this.list.count --;
                }
            },
            // writeNumber(){
            //     console.log('this.list.count',this.list.count);
            //     if(!this.list.count){
            //         Vue.set(this.list,'count',1)
            //     }else{
            //         this.list.count = this.list.count;
            //     }
            // }
        },
        watch:{
            list:{
               handler(val, oldVal){
                   console.log('val',val);
               },
               deep:true
           },
        },
    }
</script>

<style scoped lang="scss">
.cell-right{
    color:#495060;
    font-size: 28rpx;
    width: 200rpx;;
    display: flex;
    margin-top: 12rpx;
    padding-right: 12rpx;
    padding-top: 20rpx;
    .write-number{
        text-align: center;
        height: 60rpx;
        line-height: 60rpx;
    }
    span{
        display: block;
        width: 280rpx;
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
</style>
