<template>
    <div class="cell-right">
        <span  @click.stop.prevent="addCart" class="icon-add cart-add" :id=" 'add_' + list.materialCode"></span>
        <input type="number"  v-show="list.count>0" class="write-number" v-model="list.count" placeholder="0" >
        <div class="cart-decrease" :animation='animationData' v-show="list.count>0" @click.stop.prevent="reduceCart">
            <span class="inner icon-remove"></span>
        </div>
        <view class="good_box" v-if="hide_good_box" :style="{left:bus_x+'px',top:bus_y+'px' }"></view>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { bezier } from '@/utils/public'

    export default{
        props:{
            list:{
                type:Object
            }
        },
        data(){
            return {
                animationData: {},
                hide_good_box:true,
                bus_x: 1000,
                bus_y: 1000,
                systemInfo:null,
                goodsH:null,
                finger:{},
                busPos:{},
                linePos:{},
                timer:null,
                clickTime:null
            }
        },
        async onLoad(){
            let systemInfo = wx.getSystemInfoSync();
            this.busPos = {};
            this.busPos['x'] = 45;
            this.busPos['y'] = systemInfo.windowHeight - 56;
            this.systemInfo = systemInfo;
            this.goodsH = systemInfo.windowHeight - 245 - 48;
        },
        methods:{
            addCart(event){
                let e = event;
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
                this.moveBall(e);
            },
            reduceCart(){
                if(this.list.count){
                    this.list.count --;
                }
            },
            moveBall(e){
                let topPoint = {};
                this.finger['x'] = e.touches["0"].clientX;
                this.finger['y'] = e.touches["0"].clientY;

                if (this.finger['y'] < this.busPos['y']) {
                  topPoint['y'] = this.finger['y'] - 50;
                } else {
                  topPoint['y'] = this.busPos['y'] - 50;
                }

                topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;
                if (this.finger['x'] > this.busPos['x']) {
                  topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
                } else {
                  topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
                }

                this.linePos = bezier([this.busPos, topPoint, this.finger], 30);
                let nowTime = new Date().getTime();
                if (this.clickTime != 'undefined' && (nowTime - this.clickTime < 1000)) {
                    wx.showToast({
                      title: '支持手动输入',
                      icon: 'loading',
                      duration: 1000
                    })
                    return false
                }
                this.clickTime = nowTime;
                this.startAnimation(e);
            },
            startAnimation (e) {
                var index = 0, that = this,
                    bezier_points = that.linePos['bezier_points'];
                that.hide_good_box = false;
                that.bus_x = that.finger['x'];
                that.bus_y = that.finger['y'];
                that.hide_good_box = true;

                let len = bezier_points.length;
                index = len;
                that.timer = setInterval(function () {
                  index--;
                  that.bus_x = bezier_points[index]['x'];
                  that.bus_y = bezier_points[index]['y'];
                  if (index < 1) {
                    clearInterval(that.timer);
                    that.hide_good_box = false;
                  }
              }, 22);
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

/*抛物线动画*/
.good_box{
  width: 18px;
  height: 18px;
  position: fixed;
  border-radius: 50%;
  overflow: hidden;
  z-index: 3000!important;
  background:#1e84ec;
}
</style>
