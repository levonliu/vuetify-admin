import Vue from "vue"
import Vuex from 'vuex'

import app from './modules/app'
import nav from './modules/nav'
import snackBar from './modules/snackBar'

Vue.use( Vuex );

const store = new Vuex.Store({
    modules:{
        app,
        nav,
        snackBar,
    },
    // strict: true,
});

export default store;