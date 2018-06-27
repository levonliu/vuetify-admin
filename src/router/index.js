import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/Login'
import Index from '../page/Index'
import Customer from '../page/customer/Customer'

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
            children : [
                {
                    path     : 'customer',
                    name     : 'customer',
                    component: Customer,
                }
            ]
        }
    ]
})