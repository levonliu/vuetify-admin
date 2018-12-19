import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import CommonPlugin from '@/plugins/common'

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(CommonPlugin);

new Vue({
    router,
    store,
    render: h => h( App )
}).$mount('#app');
