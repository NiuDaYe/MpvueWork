<template>
    <div class="model" :style="'height:'+ contentHeight" >
        <view class="modelWelcome">欢迎使用天子星订货宝</view>
        <view class="btns">
            <button wx:if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" lang="zh_CN">开始使用</button>
            <view wx:else>请升级微信版本</view>
        </view>
    </div>
</template>

<script type="text/javascript">
import wxp from 'minapp-api-promise';

export default{
    data() {
        return{
            //判断小程序的API，回调，参数，组件等是否在当前版本可用。
            canIUse: wx.canIUse('button.open-type.getUserInfo'),
            winHeight:null
        }
    },
    methods:{
        bindGetUserInfo(e){

            // 操作用户权限按钮
            // wx.openSetting({
            //   success: (res) => {
            //     /*
            //      * res.authSetting = {
            //      *   "scope.userInfo": true,
            //      *   "scope.userLocation": true
            //      * }
            //      */
            //   }
            // })

            // 判断是否授权
            // wx.getSetting({
            //     success: function(res){
            //         if (res.authSetting['scope.userInfo']) {
            //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            //             // wx.getUserInfo({
            //             //     success: function(res) {
            //             //         console.log(res.userInfo)
            //             //     }
            //             // })
            //
            //             wx.login({
            //               success: function(res) {
            //                 if (res.code) {
            //                     console.log('res.code',res.code);
            //                   //发起网络请求
            //                   // wx.request({
            //                   //   url: 'https://api.weixin.qq.com/sns/jscode2session',
            //                   //   data: {
            //                   //     code: res.code
            //                   //   }
            //                   // })
            //                 } else {
            //                   console.log('登录失败！' + res.errMsg)
            //                 }
            //               }
            //             });
            //
            //         }
            //     }
            // })
            //


            if (e.mp.detail.userInfo){
              //console.log('用户按了允许授权按钮');
              // const url = '../login/main'
              // wx.navigateTo({ url })
              // this.showWelcome = true;
              // wx.setStorageSync('user',e.mp.detail.userInfo);
            } else {
                //console.log('用户按了拒绝按钮');
            }
        }
    },
    async onLoad() {
        let getSystemInfo = await wxp.getSystemInfo();
        this.winHeight = getSystemInfo.windowHeight;

        await wxp.setNavigationBarTitle({
          title: '天子星订货宝'
        })

        await wxp.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#199ed8',
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }
        })
    },
    computed: {
        contentHeight() {
            if (this.winHeight) {
                return this.winHeight + 'px'
            }
        },
    },
}
</script>

<style scoped lang="scss">
.model{
    width:100%;
    background: #fff;
    position: fixed;
    top:0;
    left:0;
    .modelWelcome{
        height: 800rpx;
        line-height: 800rpx;
        text-align: center;
        color:#199ed8;
        font-size: 48rpx;
    }
    .btns{
        button{
            width: 80%;
            margin: 0 auto;
            background: #199ed8;
            color: #fff;
        }
    }
}
</style>
