import Vue from 'vue'
import App from './index'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        usingComponents: {
            // "i-button": "../../../static/examples/button/index",
            // "i-input": "../../../static/examples/input/index"
        }
    }
}
