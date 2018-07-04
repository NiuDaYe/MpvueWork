<template>
  <div class="login">

      <!-- iview组件 input不能双向数据绑定  再试试？ -->

      <!-- <div class="pubClass">
          <input type="text" v-model="tenancyId" placeholder="请输入商户名">
      </div>
      <div class="pubClass">
          <input type="text" v-model="userName" placeholder="请输入用户名">
      </div>

      <div class="pubClass">
          <input type="password" v-model="password" placeholder="请输入密码">
      </div>

       -->

        <i-panel title="基础用法">
            <i-input :value="tenancyId" title="商户名" placeholder="请输入商户名" maxlength=-1 @change="tenancyIdFn"/>
            <i-input :value="userName" type="number" title="用户名" placeholder="请输入用户名" maxlength=-1 @change="userNameFn"/>
            <i-input :value="password" type="password" title="密码" placeholder="请输入密码" maxlength=-1 @change="passwordFn"/>
        </i-panel>

        <div class="loginBtn">
            <i-button @click="login" :loading="buer" type="primary">登录</i-button>
        </div>

      <i-message id="message" />

  </div>
</template>

<script>
import wxp from 'minapp-api-promise'
import fetch from '@/utils/fetch'
import md5 from 'js-md5'
const { $Message } = require('../../../static/examples/base/index');

export default{
    data(){
        return{
            tenancyId: '',
            userName: 'lqqdan',
            password: '123456',
            buer:false
        }
    },
    methods:{
        login(){
            let _this = this;
            this.buer = true;
            let data = {
                "data":[
                    {
                        "tenancyId":this.tenancyId,
		                "password":md5(this.password),
		                "userName":this.userName
                    }
                ],
                "pagination":null,
                "store_id":"",
                "tenancy_id":"maidanglao"
            }
            data = JSON.stringify(data);
            fetch.post('/login/appLogin', data)
            .then(function (res) {
                if(res.errcode == 0){
                    wx.setStorageSync('userInfo',res.data[0]);
                    _this.buer = false;
                    $Message({
                        content: '登录成功！',
                        type: 'success'
                    });

                    setTimeout(function(){
                        wx.redirectTo({
                          url: '../../pages/index/main'
                        })
                    },2000)
                }else{
                    _this.buer = false;
                    if(_this.tenancyId == ""){
                        $Message({
                            content: "请输入商户名",
                            type: 'error'
                        });
                    }else if(_this.userName == ""){
                        $Message({
                            content: "请输入用户名",
                            type: 'error'
                        });
                    }else if(_this.password == ""){
                        $Message({
                            content: "请输入密码",
                            type: 'error'
                        });
                    }else{
                        $Message({
                            content: "请输入正确的账号密码",
                            type: 'error'
                        });
                    }

                }
            })
        },
        tenancyIdFn(event){
            this.tenancyId = event.mp.detail.detail.value;
        },
        userNameFn(event){
            this.userName = event.mp.detail.detail.value;
        },
        passwordFn(event){
            this.password = event.mp.detail.detail.value;
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
