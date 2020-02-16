<template lang="pug">
  v-app
    v-content
      l-map(
        ref="map_ref"
        :options="map_options"
        :center.sync="map_data.center"
        style="height: 100vh;"
        @ready="initMap"
        @location-found="locationFound" )
        l-control-zoom(position="topright")
        l-tile-layer(
          :url="map_data.url"
          :attribution="map_data.attribution" )
        l-layer-group(ref="markers_layer" @ready="drawItems(items)")
        l-feature-group(ref="features")
          l-popup(ref="popup")
            v-card(flat width="100px")
              v-card-text(v-if="selectedItem") {{selectedItem.name}}
        l-locatecontrol( :options="locate_options" )
        l-control( position="topleft" )
          v-text-field(
            v-model="query"
            color="primary"
            backgroundColor="#fff"
            placeholder="Medicine name here"
            clearable solo filled
            style="width: 400px"
            append-icon="fa fa-search" )

</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import * as Vue2Leaflet from 'vue2-leaflet'
import Vue2Leaflet_LControlLocate from 'vue2-leaflet-locatecontrol';
import debounce from '../plugins/debounce';

export default {
  components: {
    'l-map'          : Vue2Leaflet.LMap,
    'l-tile-layer'   : Vue2Leaflet.LTileLayer,
    'l-layer-group'  : Vue2Leaflet.LLayerGroup,
    'l-feature-group': Vue2Leaflet.LFeatureGroup,
    'l-control-zoom' : Vue2Leaflet.LControlZoom,
    'l-control'      : Vue2Leaflet.LControl,
    'l-locatecontrol': Vue2Leaflet_LControlLocate,
    'l-popup'        : Vue2Leaflet.LPopup,
  },
  data: function () {
    return {
      query       : '',
      map         : null,
      selectedItem: null,
      map_options : {
        preferCanvas: true,
        zoomControl : false,
        zoom        : 13,
      },
      map_data: {
        center     : {lat:36.758174, lng:10.277265},
        url        : "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      },
      locate_options: {
        position            : 'topright',
        keepCurrentZoomLevel: true
      },
      // items: [
      //   {name: "Pharma 1", position: {lat:36.7174, lng:10.275} },
      //   {name: "Pharma 2", position: {lat:36.7184, lng:10.285} },
      //   {name: "Pharma 3", position: {lat:36.7194, lng:10.295} },
      //   {name: "Pharma 4", position: {lat:36.7164, lng:10.255} },
      //   {name: "Pharma 5", position: {lat:36.7104, lng:10.205} },
      // ],
    }
  },
  computed: {
    items () {
      return this.$store.getters['pharmacies'] || [];
    }
  },
  created () {
    this.query = this.$route.params.query || ''
  },
  watch: {
		items(val) {
			this.drawItems(val);
    },
    query: debounce(function(query) {
      let center = this.map_data.center;
      let lat_lng = {lng: center.lng, lat: center.lat};
      this.$store.dispatch('search', {
        query: query,
        pos  : lat_lng
      });
    }, 700),
    'map_data.center'(pos) {
      let lat_lng = {lng: pos.lng, lat: pos.lat};
      this.$store.dispatch('search', {
        query: this.query,
        pos  : lat_lng
      });
    }
  },
  methods: {
    initMap(mapObject) {
			this.map = mapObject;
    },
    drawItems(items) {
			let vm = this;
			let group = vm.$refs.markers_layer.mapObject;
			if(!group) return;

			group.clearLayers();
			items.forEach(item => {
        let lat_lng  = L.latLng({lng: item.coordinates[0], lat: item.coordinates[1]});
        let icon_img = require('leaflet/dist/images/marker-icon.png');
        let icon     = L.icon({iconUrl: icon_img});
        let marker   = L.marker(lat_lng, {icon: icon});
				marker.on('click', () => vm.openPopup(item), vm);
				group.addLayer(marker);
			});
		},
    openPopup(item) {
			let lat_lng = L.latLng(item.coordinates);
			this.selectedItem = item;
			this.$refs.features.mapObject.openPopup(lat_lng);
    },
    locationFound(val) {
      console.log('val',val);
    },
  }

}
</script>

<style lang="scss" scoped>
</style>
