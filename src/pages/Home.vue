<template lang="pug">
  .home
    img(alt="Vue logo" src="../assets/logo.png")
    h3(@click="handleClick") LANDING PAGE
    p connected user: {{user}}
    div(v-if="!$auth.loading")
    v-btn(v-if="$auth.isAuthenticated" @click="logout") Logout
    v-btn(v-else @click="login") Login
    router-link(to="/auth/register") Register
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  computed: {
    user () {
      return this.$store.getters['auth/user']
    }
  },
  methods: {
    handleClick (val) {
      console.log(val)
    },
    // Log the user in
    login () {
      this.$auth.loginWithRedirect()
    },
    // Log the user out
    logout () {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    }
  }
}
</script>
