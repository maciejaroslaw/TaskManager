<template>
    <div style="height: 100%" class="is-flex pt-6 is-align-items-start is-justify-content-center is-flex-direction-row columns">
        <form class="box p-6 column is-half">
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                <input v-model="registerCreds.username" :class="[errors.username ? 'is-danger' : '']" class="input" type="text" placeholder="e.g. alex@example.com">
                <p v-show="errors.username" class="help is-danger">Usernamename is wrong</p>
                </div>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                <input v-model="registerCreds.password" :class="[errors.password ? 'is-danger' : '']" class="input" type="password" placeholder="********">
                <p v-show="errors.password" class="help is-danger">Password is wrong</p>
                </div>
            </div>

            <div class="field">
                <label class="label">Confirm password</label>
                <div class="control">
                <input v-model="registerCreds.password_confirm" :class="[errors.password ? 'is-danger' : '']" class="input" type="password" placeholder="********">
                <p v-show="errors.password" class="help is-danger">Passwords dont match</p>
                </div>
            </div>
            <div class="has-text-centered">
                <p class="help is-danger">{{errors.msg}}</p>
            </div>
            <div class="has-text-centered mt-4">
                <button @click="register" class="button is-link is-centered">Sign Up</button>
            </div>
        </form>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useStore } from "vuex";

export default {
    setup () {
        const store = useStore();


        const registerCreds = reactive({
            username: '',
            password: '',
            password_confirm: '',
        });
        const errors = reactive({
            username: false,
            password: false,
            msg: '',
        });

        function register(e){
            e.preventDefault();

            errors.username = false;
            errors.password = false;
            errors.msg = '';

            if(!registerCreds.username){
                errors.username = true;
            }else if(!registerCreds.password){
                errors.password = true;
            }else if(registerCreds.password != registerCreds.password_confirm){
                errors.password = true;
            }else{
                axios.post(`${this.$api_url}/auth/register`, {
                    username: registerCreds.username,
                    password: registerCreds.password,
                }).then(res=>{
                    console.log(res);
                }).catch(err=>{
                    // console.log(err.response.data.message);
                    // this.$store.dispatch('err/setError', err.response.data.message);
                    if(err.response.data.message === "Username already taken!"){
                        errors.username = true;
                    }
                    store.dispatch("err/setError", err.response.data.message);
                });
            }
        }

        return {registerCreds, errors, register}
    }
}
</script>

<style lang="scss" scoped>

</style>