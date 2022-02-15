import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';



require('./assets/main.scss')

const app = createApp(App).use(store).use(router);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$token = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user && user.accessToken){
        return {'x-access-token': user.accessToken};
    }else{
        return {}
    }
}

app.mount('#app')
