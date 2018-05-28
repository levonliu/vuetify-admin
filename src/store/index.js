import Vuex from 'vuex'
import Vue from "vue"

import Nav from './modules/nav'

Vue.use( Vuex );

const store = new Vuex.Store({
    modules:{
        Nav,
    }
});

export default store;