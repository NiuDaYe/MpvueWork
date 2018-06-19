import fetch from '@/utils/fetch'

//console.log('process.env.NODE_ENV',process.env.NODE_ENV) development

export function login(paramsdata) {
    return fetch({
        baseURL: '../../../api',
        url: '/login/appLogin',
        method: 'post',
        data:paramsdata
    })
}
