import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/Login'
import Index from '../page/Index'
import dashboard from '../page/dashboard/Index'
import Customer from '../page/customer/Customer'
import Goods from '../page/goods/Goods'

Vue.use(Router);

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/login',
            name:'login',
            component:Login
        },
        {
            path     : '/',
            name     : 'index',
            component: Index,
            redirect: '/index',
            children : [
                {
                    path     : 'index',
                    name     : 'index',
                    component: dashboard,
                },
                {
                    path     : 'customer',
                    name     : 'customer',
                    component: Customer,
                },
                {
                    path     : 'goods',
                    name     : 'goods',
                    component: Goods,
                }
            ]
        }
    ]
})