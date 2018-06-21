<template>
  <div class="pageIndex" :style="'height:'+ welcomeHeight">
        <header>
            <i-row>
                <i-col span="4" offset="1">
                    <i-avatar :src="userInfo.avatarUrl" size="large"></i-avatar>
                </i-col>
                <i-col span="8">
                    <div class="col-class">
                        {{userInfo.nickName}}
                    </div>
                </i-col>
                <i-col span="8">
                    <div class="col-class">
                        {{userInfo.shanghuhao}}
                    </div>
                </i-col>
            </i-row>
        </header>

        <div class="content">
            <i-grid>
                <a href="/pages/goods/main" class="pub-clo">
                    <i-grid-item>
                        <i-grid-icon>
                            <i-icon size="30" type="publishgoods_fill" />
                        </i-grid-icon>
                        <i-grid-label>要货</i-grid-label>
                    </i-grid-item>
                </a>
                <a href="/pages/orders/main">
                    <i-grid-item>
                        <i-grid-icon>
                            <i-icon size="30" type="createtask_fill" />
                        </i-grid-icon>
                        <i-grid-label>订单</i-grid-label>
                    </i-grid-item>
                </a>
            </i-grid>
            <i-grid>
                <i-grid-item>
                    <i-grid-icon>
                        <i-icon size="30" type="tasklist_fill" />
                    </i-grid-icon>
                    <i-grid-label>收货</i-grid-label>
                </i-grid-item>
                <i-grid-item>
                    <i-grid-icon>
                        <i-icon size="30" type="picture_fill" />
                    </i-grid-icon>
                    <i-grid-label>报表</i-grid-label>
                </i-grid-item>
            </i-grid>
        </div>

        <i-button bind:click="handleClick" class="11">退出</i-button>

        <div class="model" :style="'height:'+ welcomeHeight" v-show="showWelcome">
            <view class="modelWelcome">欢迎使用天子星订货宝</view>
            <view class="btns">
                <button wx:if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" lang="zh_CN">开始使用</button>
                <view wx:else>请升级微信版本</view>
            </view>
        </div>

  </div>
</template>

<script>
import fetch from '@/utils/fetch';
import wxp from 'minapp-api-promise';


export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {
          nickName:'点击登录',
          shanghuhao:'',
          avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg'
      },
      showModel: false,
      disabledClick:false,
      showWelcome:true,
      winHeight:null,
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
    }
  },
  components: {
  },
  methods: {
    toLogin () {
        wx.login({
          success: function(res) {
            if(res.code){
                wx.getUserInfo({
                  success: function(res) {
                    wx.setStorageSync('userInfo',res.userInfo);
                    _self.userInfo = res.userInfo;
                    _self.showModel = false;
                  }
                })
            }else{
                wx.showToast({
                    title: '登录失败！',
                    icon: 'cancel',
                    duration: 1000
                })
            }
          }
        });
    },
    bindGetUserInfo(e){
        if (e.mp.detail.userInfo){
          //console.log('用户按了允许授权按钮');
          this.showWelcome = false;
          this.userInfo = e.mp.detail.userInfo;
          wx.setStorageSync('userInfo',e.mp.detail.userInfo);
        } else {
            //console.log('用户按了拒绝按钮');
        }
    }
  },
  async onLoad() {
      let _self = this;
      var that = this;

      let getSystemInfo = await wxp.getSystemInfo();
      this.winHeight = getSystemInfo.windowHeight;
      await wxp.setNavigationBarTitle({
        title: '天子星订货宝'
      })

      let info = wx.getStorageSync('userInfo');
      if(info){
          this.userInfo = wx.getStorageSync('userInfo');
          this.showWelcome = false;
      }else{
          this.showModel = true;
          wx.getSetting({
             success(res) {
                if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success() {},
                        fail() {
                            this.showWelcome = true;
                        }
                    })
                }else{
                    wx.login({
                      success: function(res) {
                        if(res.code){
                            wx.getUserInfo({
                              success: function(res) {
                                wx.setStorageSync('userInfo',res.userInfo);
                                _self.userInfo = res.userInfo;
                                _self.showWelcome = false;
                              }
                            })
                        }else{
                            wx.showToast({
                                title: '登录失败！',
                                icon: 'cancel',
                                duration: 1000
                              })
                        }
                      }
                    });

                }
            }
         })
      }

  },
  created () {

      // fetch.get('/login/appLogin')
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

    // 调用应用实例的方法获取全局数据
    //    this.toLogin()
  },
  computed: {
      welcomeHeight() {
          if (this.winHeight) {
              return this.winHeight + 'px'
          }
      },
  },
}
</script>

<style scoped lang="scss">
.pageIndex{
    width: 100%;
    font-size: 32rpx;
    background: #f8f8f9;
    header{
        padding:20rpx 0;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1),0 0 10px rgba(0,0,0,0.1) inset;
        height: 80rpx;
        margin-bottom: 30rpx;
        background: #fff;
        .col-class{
            line-height: 88rpx;
            width:100rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .content{
        margin-bottom: 220rpx;
        background: #fff;
    }

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
}


</style>
