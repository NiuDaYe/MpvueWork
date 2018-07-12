import Vue from 'vue'
import Layout from './Layout'

Vue.config.productionTip = false
Layout.mpType = 'app'

const app = new Vue(Layout)
app.$mount()

let userInfo = wx.getStorageSync('userInfo');

if(!userInfo){
    wx.reLaunch({
      url: 'pages/login/main'
    })
}

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: [
            '^pages/login/main',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        },

    }
}
