import fetch from '@/utils/fetch'

// 登录
export function login(data) {
    return fetch.post('/login/appLogin',data)
}

// 物品
export function findCategory(data) {
    return fetch.post('/material/findCategoryAndDcMaterial',data)
}

// 提交订单
export function submitOrder(data) {
    return fetch.post('/appOrder/submitOrder',data)
}

// 获取openID
export function loginCredentialsCheck(data) {
    return fetch.post('/miniProgramRelated/loginCredentialsCheck',data)
}

// 余额支付
export function balancePayment(data) {
    return fetch.post('/appOrder/balancePayment',data)
}

// 订单列表
export function findOrderList(data) {
    return fetch.post('/appOrder/findOrderList',data)
}

// 取消订单
export function cancelOrder(data) {
    return fetch.post('/appOrder/cancelOrder',data)
}

// 订单详情
export function findOrderDetail(data) {
    return fetch.post('/appOrder/findOrderDetail',data)
}

// 确认收货
export function confirmReceive(data) {
    return fetch.post('/appOrder/confirmReceive',data)
}

// 再来一单
export function oneMore(data) {
    return fetch.post('/appOrder/oneMore',data)
}
