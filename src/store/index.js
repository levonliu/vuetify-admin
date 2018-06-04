import Vuex from 'vuex'
import Vue from "vue"

import Nav from './modules/nav'
import snackBar from './modules/snackbar'

Vue.use( Vuex );

const store = new Vuex.Store({
    modules:{
        Nav,
        snackBar,
    }
});

export default store;