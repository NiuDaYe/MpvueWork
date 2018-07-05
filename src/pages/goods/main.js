import Vue from 'vue'
import App from './index'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        usingComponents: {
            "i-cell-group": "../../../static/examples/cell-group/index",
            "i-cell": "../../../static/examples/cell/index",
            "i-icon": "../../../static/examples/icon/index",
            "i-row": "../../../static/examples/row/index",
            "i-col": "../../../static/examples/col/index",
            "i-badge": "../../../static/examples/badge/index",
            "i-input": "../../../static/examples/input/index"
        }
    }
}
