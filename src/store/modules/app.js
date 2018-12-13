import { login } from '@/api/user'
const state = {
    user: {
        name: '游客',
        phone: "186****1290",
        company_name: "公司名称",
        company_address: "公司地址",
        rules: []
    },
    menus:[],
    token: localStorage.getItem('saas_token'),
};

const getters = {
};

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
};

const mutations = {
    SET_TOKEN : (state,token) => {
        state.token = token
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}