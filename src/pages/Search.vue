<template lang="pug">
  //- div(v-if="!query") NO query
  //- div(v-else) SEARCH {{ query }}
  v-app
    v-content
      section
        v-row(align="center" justify="center" style="height:400px")
          v-col(cols="3")
            v-text-field(
              v-model="search_value"
              placeholder="Medicine"
              hideDetails
              filled )
          v-col(cols="3")
            v-btn() Search
              v-icon fa fa-search
      section
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
