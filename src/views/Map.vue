<template>
  <div class="absolute pin w-screen h-full">
    <Map/>
    <Deck/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";
import Map from "@/components/Map.vue";
import Deck from "@/components/Deck.vue";

export default {
  name: "home",
  components: {
    Map,
    Deck
  },
  computed: {
    ...mapState({
      accessToken: state => state.map.accessToken
    })
  },
  methods: {
    ...mapActions("map", ["setAccessToken"])
  }
};
</script>

<style lang="scss">
</style>
