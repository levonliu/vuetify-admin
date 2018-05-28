const state = {
    navOpen:true
};

const getters = {
    navOpen:state => state.navOpen
};


const mutations = {
    changeNavOpen(state,open){
        state.navOpen = open
    }
};

export default {
    state,
    getters,
    mutations,
}