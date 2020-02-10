<template lang="pug">
  //- div(v-if="!query") NO query
  //- div(v-else) SEARCH {{ query }}
  v-app
    v-content
      section
        v-row(align="center" justify="center" style="height:400px")
          v-col(cols="4")
            v-text-field(
              v-model="query"
              placeholder="Medicine name here"
              hideDetails
              clearable
              append-icon="fa fa-search"
              filled )
          //- v-col(cols="2")
            v-btn() Search
              v-icon fa fa-search
      section(v-if="query!=''")
        v-row(align="center" justify="center" style="height:400px")
          v-col(cols="12")
            GmapMap(
              ref="mapRef"
              :center="map_data.center"
              :zoom="map_data.zoom"
              :map-type-id="map_data.type"
              style="width: 600px; height: 300px; margin-left: auto; margin-right: auto;")
              GmapMarker(
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                @click="panMap(m.position)")

</template>

<script>
import {gmapApi} from 'vue2-google-maps'

export default {
  data: function () {
    return {
      query: '',
      map_data: {
        center: {lat:36.758174, lng:10.277265},
        zoom: 12,
        type: "terrain"
      },
      markers: [
        {position: {lat:36.7164, lng:10.255} },
        {position: {lat:36.7174, lng:10.275} },
        {position: {lat:36.7184, lng:10.285} },
        {position: {lat:36.7194, lng:10.295} },
        {position: {lat:36.7104, lng:10.205} },
      ]
    }
  },
  computed: {
    google: gmapApi
  },
  created () {
    this.query = this.$route.params.query || ''
  },
  methods: {
    panMap(position) {
      this.$refs.mapRef.panTo(position)
    }
  }

}
</script>
