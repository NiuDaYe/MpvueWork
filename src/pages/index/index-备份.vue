<template>
  <div class="pageIndex">
        <header>
            <i-row>
                <i-col span="4" offset="1">
                    <i-avatar :src="userInfo.avatarUrl" size="default"></i-avatar>
                </i-col>
                <i-col span="8">
                    <div class="col-class" @click="toLogin">
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

        <!-- <button open-type="getUserInfo" class="agree" bindgetuserinfo="agreeGetUser" lang="zh_CN">去设置</button> -->


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
                <a href="/pages/counter/main">
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

        <!-- <div v-if="disabledClick"> -->
            <i-button bind:click="handleClick">退出</i-button>
        <!-- </div> -->

        <!-- <div v-if="!disabledClick">
            <i-button bind:click="handleClick">授权</i-button>
        </div>

        <div class="disabledClick" @click="toLogin" v-if="!disabledClick"></div> -->

    <!-- <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

    <card :text="motto"></card>

    <i-button bind:click="handleClick" type="success" shape="circle" size="large">大尺寸</i-button>
    <i-button bind:click="handleClick" type="success" shape="circle">默认尺寸</i-button>
    <i-button bind:click="handleClick" type="success" shape="circle" size="small">小尺寸</i-button> -->


  </div>
</template>

<script>
import fetch from '@/utils/fetch';
import card from '@/components/card';
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
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
      canIUse: wx.canIUse('button.open-type.getUserInfo')

    }
  },
  components: {
    card
  },
  methods: {
      jiance(){
          var that = this;
          wx.getSetting({
              success(res) {
                  console.log(res.authSetting['scope.userInfo'])
                  if (!res.authSetting['scope.userInfo']) {
                      wx.authorize({
                          scope: 'scope.userInfo',
                          success() {
                              // 用户已经同意小程序获取用户信息
                              wx.getUserInfo();
                              that.getUserInfo();
                              res.authSetting = {
                                  "scope.userInfo": true,
                                  "scope.userLocation": true
                              }
                          },
                          fail() {
                              wx.showModal({
                                  title: '请授权',
                                  content: '需要用户授权才能登录',
                                  success: function (res) {
                                      if (res.confirm) {
                                          console.log('用户点击确定')


                                          wx.openSetting({
                                              success:function(res){
                                                  console.log('resopenSetting',res);

                                                if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                                                     //这里是授权成功之后 填写你重新获取数据的js
                                                     //参考:
                                                }
                                            },
                                            fail() {
                                                    wx.showModal({
                                                        title: '请设置',
                                                        content: '请设置',
                                                    })
                                                    that.isAuthUserInfo();
                                                }
                                            })



                                          // wx.openSetting({
                                          //     success: (res) = > {
                                          //         console.log('res1111111',res);
                                          //         res.authSetting = {
                                          //             "scope.userInfo": true,
                                          //             "scope.userLocation": true
                                          //         }
                                          //     },
                                          //     fail() {
                                          //         wx.showModal({
                                          //             title: '请设置',
                                          //             content: '请设置',
                                          //         })
                                          //         that.isAuthUserInfo();
                                          //     }
                                          // })
                                      } else if (res.cancel) {
                                          that.isAuthUserInfo();
                                      }
                                  }
                              })
                          }
                      })
                  }
              }
          })
      },
  },
  async onLoad() {
      var that = this;

      await wxp.setNavigationBarTitle({
        title: '天子星订货宝'
      })

      // let info = wx.getStorageSync('userInfo');
      // if(info){
      //     this.disabledClick = true;
      //     this.userInfo = wx.getStorageSync('userInfo');
      // }else{
      //     this.showModel = true;
      // }



      this.jiance();








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
      contentLeftHeight() {
        return this.userInfo
      },
  },
}
</script>

<style scoped lang="scss">
.pageIndex{
    width: 100%;
    font-size: 16px;
    background: #f8f8f9;
    header{
        padding:10px 0;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1),0 0 10px rgba(0,0,0,0.1) inset;
        height: 40px;
        margin-bottom: 30px;
        background: #fff;
        .col-class{
            line-height: 40px;
            width:100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .content{
        margin-bottom: 220px;
        background: #fff;
    }
}

.disabledClick{
    width:100%;
    height: 640rpx;
    background: #ccc;
    position: fixed;
    top:0;
    z-index: 2;
    opacity: 0;
}
</style>
