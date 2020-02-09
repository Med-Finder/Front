<template lang="pug">
  <v-app>
    v-app-bar(
      app
      color="primary"
      dark)
    <v-content>
      router-view
    </v-content>
  </v-app>
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
  })
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css");
</style>
