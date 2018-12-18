<template>
  <section id="map" class="z-0 h-full"></section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Map",
  components: {},
  mounted() {
    let map = this.createMap(this.$el);
    let layers = this.layers;
    map.on("load", function() {
      layers.forEach(layer => {
        map.addLayer({
          id: layer.id.toString(),
          type: "line",
          source: {
            type: "geojson",
            data: layer.data
          }
        });
      });
    });
  },
  computed: {
    ...mapGetters("map", ["createMap"]),
    ...mapGetters("data", ["layers"])
  },
  methods: {}
};
</script>

<style>
@import url("//api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css");
</style>
