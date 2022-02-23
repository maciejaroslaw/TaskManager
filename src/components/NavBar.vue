<template>
    <nav class="navbar is-transparent has-text-weight-semibold" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </a>

            <a @click="menuActive = !menuActive" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div :class="[menuActive ? 'is-active' : '', ]" class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">
                    Home
                </router-link>

                <router-link v-if="currentUser" to="/tasks" class="navbar-item">
                    Tasks
                </router-link>

                <router-link v-if="isAdmin" to="/users" class="navbar-item">
                    Users list
                </router-link>
            </div>

            <div class="navbar-end">
                <div v-if="!currentUser" class="navbar-item">
                    <div class="buttons">
                        <router-link to="/register" class="button is-link">
                            <strong>Sign up</strong>
                        </router-link>
                        <router-link to="/login" class="button is-light">
                            Log in
                        </router-link>
                    </div>
                </div>
                <div v-else class="navbar-item"> 
                    <a @click.prevent="logout" class="button is-light">
                        Logout
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import {ref} from 'vue'
export default {
    name: 'NavBar',
    setup () {
        const menuActive = ref(false);

        return {menuActive}
    },
    computed: {
        currentUser(){
            return this.$store.state.auth.user;
        },
        isAdmin(){
            if(this.currentUser){
                return this.currentUser.role === "admin"
            }else{
                return false;
            }
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('auth/logout');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>