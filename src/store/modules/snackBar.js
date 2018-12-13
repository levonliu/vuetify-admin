const state = {
    status:false,
    type:'',
    msg:'',
    time:1500
};

const getters = {};

const actions = {
    showMessage({commit},data){
        commit('SHWO_MESSAGE',data)
    },
    closeMessage({commit}){
        commit('CLOSE_MESSAGE')
    }
}

const mutations = {
    SHWO_MESSAGE : (state,data) => {
        state.status = data.status;
        state.type = data.type;
        state.msg = data.msg;
    },
    CLOSE_MESSAGE : (state) => {
        state.status = false
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}