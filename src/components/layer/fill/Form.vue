<template>
  <form>
    <Layout v-model="layout"/>
    <Paint v-model="paint"/>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import mapboxgl from "mapbox-gl";

import Layout from "./Layout.vue";
import Paint from "./Paint.vue";

export default {
  name: "FillForm",
  components: {
    Layout,
    Paint
  },
  props: ["index"],
  data() {
    return {
      layout: {
        visibility: "visible"
      },
      paint: {
        "fill-antialias": true,
        "fill-opacity": 1,
        "fill-color": "#000000",
        "fill-outline-color": "#000000",
        "fill-translate": [0, 0],
        "fill-translate-anchor": "map",
        "fill-pattern": null
      }
    };
  },
  computed: {
    ...mapGetters("data", ["layers"]),
    visibility: {
      get() {
        return this.layers[this.index].layout.visibility;
      },
      set(value) {
        this.save({ index: this.index, property: "prop", value });
      }
    }
  },
  methods: {
    ...mapActions("data", ["save"])
  }
};
</script>

<style scoped>
</style>
