<template>
  <main id="main" class="relative">
    <Map v-if="accessToken"/>
    <section v-else class="container mx-auto mt-4">
      <label for="accessToken">Access token</label>
      <input
        id="accessToken"
        type="text"
        class="w-full border-2 rounded px-3 py-2"
        placeholder="Enter your Mapbox access token..."
        v-model="tokenValue"
        @keypress.enter.prevent.stop="setAccessToken(tokenValue)"
      >
    </section>
  </main>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";
import Map from "@/components/Map.vue";

export default {
  name: "home",
  components: {
    Map
  },
  data() {
    return {
      tokenValue: ""
    };
  },
  computed: {
    ...mapState({
      accessToken: state => state.map.accessToken
    })
  },
  methods: {
    update() {
      this.setAccessToken(this.tokenValue);
    },
    ...mapActions("map", ["setAccessToken"])
  }
};
</script>

<style lang="scss">
#main {
  height: 95vh;
}
</style>

