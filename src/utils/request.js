import axios from 'axios';
import store from '@/store/index'
import qs from 'qs';
import router from '../router';

const baseUrl = process.env.VUE_APP_BASE_URL

const service = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
})


// 添加请求拦截器
service.interceptors.request.use(function(config) {
    config.data                    = qs.stringify(config.data);
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    let token                      = localStorage.getItem("token");
    // 附加TOKEN
    if(token) {
        config.headers['Authorization'] = token;
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function(response) {
    // 获取刷新的token
    if (typeof response.headers.authorization === 'string') {
        localStorage.setItem('token', response.headers.authorization);
    }
    return response;
}, function(error) {
    const res = error.response;
    let message = {
        status:true,
        type:'error',
        time:1500
    }
    switch(res.status) {
        case 400:
            message.msg = res.data.message
            store.dispatch('showMessage', message)
            break;
        case 401:
            message.msg = res.data.message
            store.dispatch('showMessage', message)
            router.push({path: '/login'}) //页面跳转
            break;
        case 403:
            message.msg = res.data.message
            store.dispatch('showMessage', message)
            break;
        default:
            message.msg = res.data.message
            store.dispatch('showMessage', message)
            break;
    }
    return Promise.reject(error);
});

export default service;