<template>
  <form id="settings" class="mt-8 container mx-auto px-4">
    <h1 class="mb-8">Settings</h1>
    <h2 class="mb-6">Mapbox</h2>
    <Textfield
      title="Access token"
      class="mb-3"
      id="accessToken"
      placeholder="Enter your Mapbox access token..."
      v-model="tokenValue"
    ></Textfield>
    <Textfield
      title="Map style"
      class="mb-3"
      id="style"
      placeholder="Enter a Mapbox style url..."
      v-model="styleValue"
    ></Textfield>
    <h2 class="mb-6">Map center</h2>
    <section class="flex items-center justify-between -mx-3">
      <Textfield
        title="Longitude"
        class="mb-3 mx-3 flex-1"
        id="lng"
        placeholder="Enter a Mapbox style url..."
        v-model="centerLng"
      ></Textfield>
      <Textfield
        title="Latitude"
        class="mb-3 mx-3 flex-1"
        id="lat"
        placeholder="Enter a Mapbox style url..."
        v-model="centerLat"
      ></Textfield>
    </section>
    <Textfield
      title="Zoom"
      class="mb-3"
      id="zoom"
      placeholder="Enter a Mapbox style url..."
      v-model="zoomValue"
    ></Textfield>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Textfield from "@/components/form/Textfield.vue";

export default {
  name: "settings",
  components: {
    Textfield
  },
  computed: {
    ...mapState({
      accessToken: state => state.map.accessToken,
      style: state => state.map.style,
      center: state => state.map.center,
      zoom: state => state.map.zoom
    }),
    tokenValue: {
      get() {
        return this.accessToken;
      },
      set(value) {
        this.setAccessToken(value);
      }
    },
    styleValue: {
      get() {
        return this.style;
      },
      set(value) {
        this.setStyle(value);
      }
    },
    centerLng: {
      get() {
        return this.center[0];
      },
      set(value) {
        this.setCenter([value, this.center[1]]);
      }
    },
    centerLat: {
      get() {
        return this.center[1];
      },
      set(value) {
        this.setCenter([this.center[0], value]);
      }
    },
    zoomValue: {
      get() {
        return this.zoom;
      },
      set(value) {
        this.setZoom(value);
      }
    }
  },
  methods: {
    ...mapActions("map", ["setAccessToken", "setStyle", "setCenter", "setZoom"])
  }
};
</script>

<style>
</style>
