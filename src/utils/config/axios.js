import axios from 'axios'
import {
    baseUrl,
    token
} from './env'
import { Loading, Message } from 'element-ui'; // 全局loading
import storage from './storageHelp'

import store from '@/store'
import router from '@/router.js'
// import qs from 'qs'

let isShowElementLoading = true // 默认显示loading
let elementLoadingObj = null

// 创建axios实例
const service = axios.create({
    baseURL: baseUrl, // api的base_url
    timeout: 6 * 1000, // 请求超时时间
    withCredentials: false, // 表示跨域请求时是否需要使用凭证。默认不需要
    responseType: 'json', // 表示服务器响应的数据类型。默认为json
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        'Content-Type': 'application/json; charset=UTF-8'
    },

    transformRequest: [function (data) {
        // transformRequest 允许在向服务器发送前，修改请求数据
        // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
        // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream

        // form-data格式化数据，这里可以使用开头引入的qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
        // console.log('转化前', data)
        // var submitData = qs.stringify(data)
        // console.log('转化后', submitData);
        // return submitData;
        return data
    }],
    validateStatus: status => {
        // 200~300之间resolve，其余的reject
        return status < 500
    }
})

// request 请求拦截器, 主要是请求统一增加token
service.interceptors.request.use(config => {
    // 发送请求前，增加Loading
    showElementLoading()
    if (storage.token) {
        // 让每个请求携带token, 根据后台配置
        config.headers.token = storage.token
    } else {
        // 测试token
        config.headers.token = token
    }
    //  console.log('interceptors request', config);
    return config
}, error => {
    // error
    //  console.log('interceptors request error', error)
    console.log('发送失败')
    Notification.error({
        title: '发送失败',
        message: error.message
    })
    closeElementLoading()
    Promise.reject(error)
})

// response 响应拦截器, 主要是对错误统一处理
service.interceptors.response.use(
    response => {
        closeElementLoading()
        // console.log('interceptors response success', response)
        let result = {}
        if (response.status === 200) {
            result.code = 10000
            result.data = response.data
        } else {
            result.code = response.data.code ? response.data.code : 10001
            result.message = response.data.message ? response.data.message : ''
            result.error = response.data.error ? response.data.error : ''
            if (result.code === 50000) {
                // 跳转到登录页
                console.log('token过期===>', result.message)
                store.dispatch('LogOut').then(() => {
                    Message.error('登录超时, 请重新登录')
                    // alert('登录超时, 请重新登录')
                    router.push({
                        name: 'login'
                    })
                })
            }
        }
        // console.log('result', result)
        return result
    },
    error => {
        console.error('interceptors response error', error)
        closeElementLoading()
        return Promise.reject(error.response)
    })

const closeElementLoading = () => {
    if (elementLoadingObj) {
        elementLoadingObj.close()
    }
}

const showElementLoading = () => {
    // console.log('isShowElementLoading', isShowElementLoading)
    if (isShowElementLoading) {
        elementLoadingObj = Loading.service({ fullscreen: true, text: '正在加载中...' })
    }
}

/**
 * [description]
 * @param  {String}  [url='']            [url]
 * @param  {Object}  [data={}]           [请求数据]
 * @param  {String}  [requesTtype='GET'] [请求方式]
 * @param  {[type]}  noShowloading       [是否显示加载loading]
 * @return {Promise}                     [description]
 */
export default async (url = '', data = {}, requesTtype = 'GET', showloading = false) => {
    const type = requesTtype.toUpperCase()
    let requestConfig = {
        method: type,
        url: url
    }
    isShowElementLoading = showloading
    if (type === 'GET') {
        requestConfig.params = data
    }
    if (type === 'POST' || type === 'PUT') {
        // var submit = {}
        // console.log('axios', data);
        //  submit.data = data
        //  requestConfig.data = JSON.stringify(submit)
        // requestConfig.data = submit
        // submit.data = data
        // requestConfig.data = JSON.stringify(submit)
        // requestConfig.data = submit
        requestConfig.data = JSON.stringify(data)
    }
    //  console.log('requestConfig', requestConfig)
    const response = await service(requestConfig)
    //  console.log('response data', response)
    // const responseJson = await response.json()
    return response
}
