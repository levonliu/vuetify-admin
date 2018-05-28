import Vue from 'vue'
import Router from 'vue-router'
import Index from '../page/Index'
import Customer from '../page/customer/Customer'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path     : '/',
            name     : 'index',
            component: Index,
            children : [ {
                path     : 'customer',
                name     : 'customer',
                component: Customer
            } ]
        }
    ]
})