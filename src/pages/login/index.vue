<template>
  <div class="login">

      <div class="pubClass">
          <input type="text" v-model="tenancyId" placeholder="请输入商户名">
      </div>
      <div class="pubClass">
          <input type="text" v-model="userName" placeholder="请输入用户名">
      </div>

      <div class="pubClass">
          <input type="text" v-model="password" placeholder="请输入密码">
      </div>

      <div class="loginBtn">
          <button type="button" @click="login" name="button">登录</button>
      </div>
  </div>
</template>

<script>
import wxp from 'minapp-api-promise'
import fetch from '@/utils/fetch'

export default{
    data(){
        return{
            // tenancyId: 'jiyejia',
            // userName: 'zyl',
            // password: 'e10adc3949ba59abbe56e057f20f883e',
            tenancyId: 'maidanglao',
            userName: 'lqqdan',
            password: 'e10adc3949ba59abbe56e057f20f883e',
        }
    },
    methods:{
        login(){
            let data = {
                "data":[
                    {
                        "tenancyId":this.tenancyId,
		                "password":this.password,
		                "userName":this.userName
                    }
                ],
                "pagination":null,
                "store_id":"",
                "tenancy_id":"maidanglao"
            }
            data = JSON.stringify(data);

            wx.showLoading({
              title: '登录中...',
            })
            fetch.post('/login/appLogin', data)
            .then(function (res) {
                if(res.errcode == 0){
                    wx.setStorageSync('userInfo',res.data[0]);

                    wx.showLoading({
                      title: '登录中成功！',
                    })
                    setTimeout(function(){
                        wx.hideLoading()
                    },1000)

                    setTimeout(function(){
                        wx.navigateTo({
                          url: '../../pages/index/main'
                        })
                    },2000)
                }else{
                    wx.hideLoading()
                    wx.showModal({
                      title: '登录失败',
                      content: res.errmsg,
                      success: function(res) {
                        if (res.confirm) {
                          //console.log('用户点击确定')
                        }
                      }
                    })
                }
            })
            .catch(function (error) {
                wx.showLoading({
                  title: '登录失败!',
                })
                setTimeout(function(){
                  wx.hideLoading()
                },2000)
            });
        }

    },
    async onLoad() {
        await wxp.setNavigationBarTitle({
          title: '登录天子星订货宝'
        })
    },
}
</script>


<style scoped lang="scss">
.login{
    .loginBtn{
        margin-top: 80px
    }
    .loginBtn button{
        width:88%;
        margin:0 auto;
    }
    .loginBtn button:active{
        background:#f4f8f8;
    }
    .pubClass{
        width: 88%;
        margin: 0 auto;
        border-bottom: 1px solid #f4f4f4;
        margin-top: 30rpx;
        font-size: 30rpx;
        color: #585c66;
    }
}
</style>
