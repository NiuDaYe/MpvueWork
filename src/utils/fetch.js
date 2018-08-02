const { $Message } = require('../../static/examples/base/index');
let Fly=require("flyio/dist/npm/wx")
let fly=new Fly

//配置请求基地址
fly.config.baseURL = "https://ecsc.meishijia.com/ecsc-mobile-rpc";  //测试环境
// fly.config.baseURL = "https://ecsc.e7e6.net/ecsc-mobile-rpc"; //正式环境

fly.config.timeout=5000;

//添加请求拦截器
fly.interceptors.request.use((config, promise) => {
    config.headers["content-type"] = "application/json";
    return config;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response, promise) => {
        return response.data
    },
    (err, promise) => {
        $Message({
            content: '网络错误！',
            type: 'error'
        });
    }
)
export default fly
