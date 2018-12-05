<template>
  <div id="map"></div>
</template>

<script>
import { mapState } from "vuex";
import mapboxgl from "mapbox-gl";

export default {
  name: "Map",
  components: {},
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    new mapboxgl.Map({
      container: this.$el,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [-122.6587, 45.5122],
      zoom: 8
    });
  },
  computed: {
    ...mapState({
      accessToken: state => state.map.accessToken
    })
  },
  methods: {}
};
</script>

<style>
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css");
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
