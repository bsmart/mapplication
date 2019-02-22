<template>
  <section id="map" class="z-0 h-full"></section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Map",
  components: {},
  mounted() {
    this.createMap(this.$el);
  },
  beforeDestroy() {
    this.destroyMap();
  },
  methods: {
    ...mapActions("map", ["createMap", "destroyMap"])
  }
};
</script>

<style>
@import url("//api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css");
</style>
