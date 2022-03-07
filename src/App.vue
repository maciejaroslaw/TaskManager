<template>
  <div class="container">
    <NavBar />
    <div>
      <router-view v-slot="{Component}">
        <transition
          enter-active-class="animate__animated animate__slideInLeft"
          leave-active-class="animate__animated animate__slideOutRight"
        >
          <component :is="Component" />
        </transition>
      </router-view>
      <div class="modal err" :class="[isErr ? 'is-active': '']">
          <div class="modal-background"></div>
          <div class="modal-content">
              <div class="box">
                  <div class="block content">
                      <h1 class="has-text-centered py-6">{{errMsg}}</h1>
                      <div class="is-flex is-justify-content-center mt-6">
                          <button @click.prevent="errOff" class="button is-info">Ok</button>
                      </div>
                  </div>
              </div>
          </div>
          <button @click.prevent="errOff" class="modal-close is-large" aria-label="close"></button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar,
  },
  computed: {
    currentUser(){
      return this.$store.state.auth.user;
    },
    errMsg(){
      return this.$store.state.err.errMsg;
    },
    isErr(){
      // if(this.$store.state.err.errMsg === 'jwt expired'){
      //   console.log("AAA");
      // }
      return this.$store.state.err.isErr;
    },
  },
  methods: {
    errOff(){
      this.$store.dispatch('err/errOff');
    },
  },
}
</script>

<style>

</style>
