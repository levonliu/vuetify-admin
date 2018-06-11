import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://apiDemo.test/api';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    if(config.method=== "post" && config.data.constructor !== FormData){
        config.data = qs.stringify(config.data);
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    var token = localStorage.getItem("token");
    // 附加TOKEN
    if (token) {
        config.headers['Authorization'] = 'bearer '+token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.status == 200 && response.data.status) {
        // 存储TOKEN值
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }else{
            this.$router.push({ path: '/login' }) //页面跳转
        }
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios;