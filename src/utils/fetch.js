var Fly=require("flyio/dist/npm/wx")
var fly=new Fly

//配置请求基地址
// fly.config.baseURL = "http://ecsc.meishijia.com/ecsc-mobile-rpc";
fly.config.baseURL = "http://cnodejs.org/api/v1/"

// //添加请求拦截器
fly.interceptors.request.use((config, promise) => {
    config.headers["content-type"] = "application/json";
    return config;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response, promise) => {
        //只将请求结果的data字段返回
        return response.data
    },
    (err, promise) => {
        //发生网络错误后会走到这里
        //promise.resolve("ssss")
    }
)
export default fly
