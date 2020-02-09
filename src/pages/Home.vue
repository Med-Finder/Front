<template lang="pug">
  .home
    img(alt="Vue logo" src="../assets/logo.png")
    h3(@click="handleClick") LANDING PAGE
    p connected user: {{user}}
    router-link(to="/auth/login") Login
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
    }
  }
}
</script>
