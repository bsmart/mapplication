<template>
  <div class="absolute pin w-screen h-full">
    <Map/>
  </div>
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
</style>
