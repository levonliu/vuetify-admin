import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/Login'
import Index from '../page/Index'
import Customer from '../page/customer/Customer'
import CustomerEdit from '../page/customer/edit'

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
                },
                {
                    path     : 'customer_edit',
                    name     : 'customer_edit',
                    component: CustomerEdit,
                }
            ]
        }
    ]
})