<template>
  <div class="login">
        <i-panel title="">
            <i-input :value="tenancyId" title="商户名" placeholder="请输入商户名" maxlength=-1 @change="tenancyIdFn"/>
            <i-input :value="userName" title="用户名" placeholder="请输入用户名" maxlength=-1 @change="userNameFn"/>
            <i-input :value="password" type="password" title="密码" placeholder="请输入密码" maxlength=-1 @change="passwordFn"/>
        </i-panel>
        <div class="loginBtn">
            <i-button @click="toLogin" type="primary">登录</i-button>
        </div>
        <i-message id="message" />
  </div>
</template>

<script>
import wxp from 'minapp-api-promise'
import md5 from 'js-md5'
const { $Message } = require('../../../static/examples/base/index');
import { login } from '@/api/request'

// tenancyId: 'maidanglao',
// userName: 'lichangwei',
// password: '123456',

// 商户号: maidanglao
// 用户名: lichangwei
// 密码: 123456

export default{
    data(){
        return{
            tenancyId: '',
            userName: '',
            password: '',
        }
    },
    methods:{
        toLogin(){
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
            wx.showLoading({
              title: '加载中',
            })

            login(data).then( res =>{
                if(res.errcode == 0){
                    wx.setStorageSync('userInfo',res.data[0]);
                    wx.hideLoading();
                    setTimeout(function(){
                        wx.redirectTo({
                          url: '../../pages/index/main'
                        })
                    },600)
                }else{
                    if(this.tenancyId == ""){
                        $Message({
                            content: "请输入商户名",
                            type: 'error'
                        });
                    }else if(this.userName == ""){
                        $Message({
                            content: "请输入用户名",
                            type: 'error'
                        });
                    }else if(this.password == ""){
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
        let userInfo = wx.getStorageSync('userInfo');
        await wxp.setNavigationBarTitle({
          title: '登录天子星订货宝'
        })
        if(userInfo){
            this.tenancyId = userInfo.tenancyId;
            this.userName = userInfo.userName;
        }
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
