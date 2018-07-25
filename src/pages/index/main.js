import Vue from 'vue'
import App from './index'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        usingComponents: {
            "i-button": "../../../static/examples/button/index",
            "i-col": "../../../static/examples/col/index",
            "i-grid": "../../../static/examples/grid/index",
            "i-grid-item": "../../../static/examples/grid-item/index",
            "i-grid-icon": "../../../static/examples/grid-icon/index",
            "i-grid-label": "../../../static/examples/grid-label/index",
            "i-icon": "../../../static/examples/icon/index",
            "i-modal": "../../../static/examples/modal/index"
        }
    }
}
