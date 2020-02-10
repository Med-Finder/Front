<template lang="pug">
  v-app(light="")
    v-app-bar(absolute flat color="transparent")
      v-toolbar-title Dashboard
      v-spacer
      v-btn(text v-if="$auth.isAuthenticated" @click="logout")
        |Logout
        v-icon(right) fa fa-sign-in
    v-content
</template>

<script>
export default {
  methods: {
    // Log the user out
    logout () {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    }
  }
}
</script>