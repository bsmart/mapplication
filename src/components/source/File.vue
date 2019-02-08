<template>
  <span>File component</span>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "File",
  computed: {
    ...mapGetters("sources", ["currentSource"])
  }
};
</script>

<style>
</style>
