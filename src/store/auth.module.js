const user = JSON.parse(localStorage.getItem('user'));
const initState = user ? {status: {logged: true}, user: user.user} : {status: {logged: false}, user: null};

export const auth = {
    namespaced: true,
    state: initState,
    actions: {
        login({commit}, userData){
            commit('loginSuccess', userData.user);
            localStorage.setItem('user', JSON.stringify(userData));
        }
    },
    mutations: {
        loginSuccess(state, user){
            state.status.logged = true;
            state.user = user;
        }
    }
}