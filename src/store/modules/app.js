import { login, user, menu } from '@/api/user'
const state = {
    user: {
        name: '游客',
        phone: "186****1290",
        rules: []
    },
    menus:[],
    token: localStorage.getItem('saas_token'),
};

const getters = {};

const actions = {
    login({commit}, data){
        return new Promise((resolve, reject) => {
            login(data).then(response => {
                const data = response.data
                commit('SET_TOKEN', data.token);
                localStorage.setItem('token', data.token);
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    getUser({commit}){
        user().then(response => {
            const data = response.data
            commit('SET_USER', data.data)
        })
    },

    getMenu({commit}){
        menu().then(response => {
            const data = response.data
            commit('SET_MENUS', data.data)
        })
    }
};

const mutations = {
    SET_TOKEN : (state,token) => {
        state.token = token
    },

    SET_USER : (state,user) => {
        state.user = user
    },

    SET_MENUS : (state,menu) => {
        state.menus = menu
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}