import router from '../router';

const initState = {
    isErr: false,
    errMsg: "",
}

export const err = {
    namespaced: true,
    state: initState,
    actions: {
        setError({commit}, errorData){
            if(errorData.name==="TokenExpiredError"){
                localStorage.removeItem('user');
                commit('setError', errorData);
                router.push('/login');
            }else{
                commit('setError', {message: errorData})
            }
        },
        errOff({commit}){
            commit('errOff');
        }
    },
    mutations: {
        setError(state, error){
            state.isErr = true;
            state.errMsg = error.message;
        },
        errOff(state){
            state.isErr = false;
            state.errMsg = "";
        }
    }
}