<template>
  <div class="hello block pt-6 pl-4">
    <div v-if="!currentUser">
      <h1 class="title is-1">Welcome</h1>
      <h2 class="subtitle is-4 pl-2 no-margin">Please 
        <router-link to="/register" class="">
          Sign Up
        </router-link>
        <span class="is-size-6">Or 
          <router-link to="/login">
            Log in
          </router-link>
        </span>
      </h2>
    </div>
    <div v-else>
      <h1 class="title is-1">Hi, {{currentUser.username}}</h1>
      <h2 class="subtitle is-4">Please 
        <router-link to="/tasks" class="">
          Checkout Tasks!
        </router-link>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    currentUser(){
      return this.$store.state.auth.user;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
