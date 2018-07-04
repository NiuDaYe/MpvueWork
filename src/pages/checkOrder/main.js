import Vue from 'vue'
import App from './index'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        usingComponents: {
            "i-icon": "../../../static/examples/icon/index",
            "i-cell-group": "../../../static/examples/cell-group/index",
            "i-cell": "../../../static/examples/cell/index",
            "i-message": "../../../static/examples/message/index",
            "i-modal": "../../../static/examples/modal/index",
            "i-message": "../../../static/examples/message/index"
        }
    }
}
