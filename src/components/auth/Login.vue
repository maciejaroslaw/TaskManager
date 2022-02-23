<template>
    <div style="height: 100%" class="is-flex pt-6 is-align-items-start is-justify-content-center is-flex-direction-row columns Popins has-text-weight-semibold">
        <form @submit.prevent="login" class="box p-6 column is-half">
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                <input v-model="loginCreds.username" class="input" type="username" placeholder="e.g. alex@example.com">
                </div>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                <input v-model="loginCreds.password" class="input" type="password" placeholder="********">
                </div>
            </div>

            <div class="has-text-centered">
                <button :class="[isLoading ? 'is-loading' : '']" class="button is-link is-centered">Sign in</button>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    data(){
        return {
            isLoading: false,
            loginCreds: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        login(){
            this.isLoading = true;
            this.$axios.post(`${this.$api_url}/auth/login`, {
                username: this.loginCreds.username,
                password: this.loginCreds.password
            }).then(res=>{
                // console.log(typeof(res));
                this.$store.dispatch("auth/login", res.data);
                this.$router.push('/');
            }).catch(err=>{
                this.$store.dispatch('err/setError', err.response.data.message);
                this.isLoading = false;
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>