<template lang="pug">
  v-app(light="")
    v-app-bar(app dark color="primary")
      v-toolbar-title Dashboard
      v-spacer
      v-btn(text v-if="$auth.isAuthenticated" @click="logout")
        |{{user.name}}
        v-icon(right) fa fa-sign-in
    v-content
      router-view
</template>

<script>
export default {
  data: function() {
    return {
      user: this.$auth.user
    }
  },
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