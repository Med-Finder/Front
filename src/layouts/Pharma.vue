<template lang="pug">
  v-app(light="")
    v-app-bar(app dark color="primary")
      v-toolbar-title Dashboard
      v-spacer
      v-btn(text @click="logout")
        |{{user.email}}
        v-icon(right) fa fa-sign-in
    v-content
      router-view
</template>

<script>
export default {
  data: function() {
    return {
      user: this.$store.getters['user']
    }
  },
  methods: {
    // Log the user out
    logout () {
      this.$store.dispatch('logout');

    }
  }
}
</script>