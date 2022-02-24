<template>
    <div style="height: 100%" class="is-flex pt-6 is-align-items-start is-justify-content-center is-flex-direction-row columns mx-0">
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
                <button @click="register" :class="[isLoading ? 'is-loading' : '']" class="button is-link is-centered">Sign Up</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            registerCreds: {
                username: '',
                password: '',
                password_confirm: '',
            },
            errors: {
                username: false,
                password: false,
                msg: ''
            },
            isLoading: false
        }
    },
    methods: {
        register(e){
            e.preventDefault();
            this.isLoading = true;

            this.errors.username = false;
            this.errors.password = false;
            this.errors.msg = '';

            if(!this.registerCreds.username){
                this.errors.username = true;
            }else if(!this.registerCreds.password){
                this.errors.password = true;
            }else if(this.registerCreds.password != this.registerCreds.password_confirm){
                this.errors.password = true;
            }else{
                console.log(this.$api_url);
                this.$axios.post(`${this.$api_url}/auth/employees`, {
                    username: this.registerCreds.username,
                    password: this.registerCreds.password,
                }).then(res=>{
                    this.$axios.post(`${this.$api_url}/auth/login`, {
                        username: this.registerCreds.username,
                        password: this.registerCreds.password,
                    }).then(res=>{
                        this.isLoading = false;
                        this.$store.dispatch("auth/login", res.data);
                        this.$router.push('/');
                    })

                }).catch(err=>{
                    // console.log(err.response.data.message);
                    // this.$store.dispatch('err/setError', err.response.data.message);
                    if(err.response.data.message === "Username already taken!"){
                        this.errors.username = true;
                    }
                    
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>