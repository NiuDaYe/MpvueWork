<template>
  <div class="login">
      <i-panel>
            <i-input :value="value1" title="商户名" autofocus placeholder="请输入商户名" />
            <i-input :value="value2" title="用户名" placeholder="请输入用户名" />
            <i-input :value="value3" title="密码" type="password" placeholder="请输入密码" />
      </i-panel>

      <div class="loginBtn">
          <button type="button" @click="login" name="button">登录</button>
      </div>
  </div>
</template>

<script>
import wxp from 'minapp-api-promise'

export default{
    data(){
        return{
            value1: '1212',
            value2: '2323',
            value3: '',
            value4: '输入框已禁用',
            value5: '',
            value6: '',
            value7: '',
        }
    },
    methods:{
        login(){
          console.log('123');
          wx.setNavigationBarTitle({
            title: '登录中..'
          })
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
}
</style>
