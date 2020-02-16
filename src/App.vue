<template lang="pug">
  router-view
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    //
  }),

  // Redirect whenever the user logout.
  watch: {
    "$store.state.auth.user"(val) {
      if(!val) this.$router.push("/");
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css");
</style>
