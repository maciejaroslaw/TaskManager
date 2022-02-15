import {createStore} from 'vuex';
import {auth} from './auth.module';
import { err } from './err.module';

export default createStore({
    modules: {
        auth,
        err
    }
})
