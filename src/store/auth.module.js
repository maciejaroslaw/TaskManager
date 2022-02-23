import router from '../router';

const user = JSON.parse(localStorage.getItem('user'));
const initState = user ? {status: {logged: true}, user: user.user} : {status: {logged: false}, user: null};

export const auth = {
    namespaced: true,
    state: initState,
    actions: {
        login({commit}, userData){
            commit('loginSuccess', userData.user);
            localStorage.setItem('user', JSON.stringify(userData));
        },
        logout({commit}){
            commit('logoutUser');
            router.push('/login')
        }
    },
    mutations: {
        loginSuccess(state, user){
            state.status.logged = true;
            state.user = user;
        },
        logoutUser(state){
            state.status.logged = false;
            state.user = null;
            localStorage.removeItem('user');
        }
    }
}