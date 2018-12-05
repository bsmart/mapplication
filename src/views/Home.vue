<template>
  <main class="home">
    <Map v-if="accessToken"/>
  </main>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Map from "@/components/Map.vue";

export default {
  name: "home",
  components: {
    Map
  },
  computed: {
    ...mapState({
      accessToken: state => state.map.accessToken
    })
  }
};
</script>
