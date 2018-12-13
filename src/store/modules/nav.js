const state = {
    status:true
};

const getters = {
    navOpen:state => state.status
};

const actions = {
    changeNavOpen({commit},status){
        commit('CHANGE_NAV_STATUS', status);
    }
};

const mutations = {
    CHANGE_NAV_STATUS: (state,status) => {
        state.status = status
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}