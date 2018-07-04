import Vue from 'vue'
import App from './index'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        usingComponents: {
            "i-tabs": "../../../static/examples/tabs/index",
            "i-tab": "../../../static/examples/tab/index",
            "i-tab-bar": "../../../static/examples/tab-bar/index",
            "i-tab-bar-item": "../../../static/examples/tab-bar-item/index",
            "i-modal": "../../../static/examples/modal/index",
            "i-message": "../../../static/examples/message/index"
        }
    }
}
