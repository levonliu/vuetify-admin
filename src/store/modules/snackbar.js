const state = {
    snackbar :{
        status:false,
        color:'',
        msg:'',
        time:1500
    }
};

const getters = {
    snackbar:state => state.snackbar
};


const mutations = {
    changeSnackBar(state,data){
        state.snackbar.status = data.status;
        state.snackbar.color = data.color;
        state.snackbar.msg = data.msg;
    }
};

export default {
    state,
    getters,
    mutations,
}