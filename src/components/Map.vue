<template>
  <section id="map" class="z-0 h-full"></section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Map",
  components: {},
  mounted() {
    this.createMap(this.$el);
  },
  computed: {
    ...mapGetters("map", ["createMap"])
  },
  methods: {}
};
</script>

<style>
@import url("//api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css");
</style>
