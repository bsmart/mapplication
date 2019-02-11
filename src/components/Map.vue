<template>
  <section id="map" class="z-0 h-full"></section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Map",
  components: {},
  mounted() {
    let map = this.createMap(this.$el);
    map.on("load", () => {
      this.layers()
        .reverse()
        .forEach(layer => {
          map.addLayer({
            id: layer.id.toString(),
            type: layer.type,
            source: {
              type: "geojson",
              data: layer.data
            },
            paint: {
              "fill-color": layer.paint.color,
              "fill-antialias": true,
              "fill-opacity": 0.5
            }
          });
        });
    });
  },
  computed: {
    ...mapActions("map", ["createMap"])
  },
  methods: {}
};
</script>

<style>
@import url("//api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css");
</style>
