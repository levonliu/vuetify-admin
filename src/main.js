import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
    router,
    store,
    axios,
    render: h => h( App )
}).$mount('#app');
