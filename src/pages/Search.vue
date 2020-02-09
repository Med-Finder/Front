<template lang="pug">
  div(v-if="!query") NO query
  div(v-else) SEARCH {{ query }}
</template>

<script>
export default {
  data: function () {
    return {
      query: ''
    }
  },
  created () {
    this.query = this.$route.params.query || ''
  }

}
</script>
