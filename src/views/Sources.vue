<template>
  <section class="flex my-4">
    <aside class="w-1/3">
      <h2>Sources</h2>
      <button class="px-3 py-2 border rounded" @click="addSource">New source</button>
      <ul>
        <li
          v-for="(source, index) in sources"
          :key="index"
          @click="selectSource(source)"
        >{{ source.name }}</li>
      </ul>
    </aside>
    <section class="w-2/3">
      <SourceForm v-if="selectedSource" :sourceName="selectedSource.name"></SourceForm>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import SourceForm from "@/components/source/Form.vue";

export default {
  name: "Sources",
  components: { SourceForm },
  data() {
    return {
      selectedSource: null
    };
  },
  computed: {
    ...mapState(["sources"]),
    ...mapGetters("sources", ["getKeys"]),
    sourceKeys() {
      return this.getKeys;
    }
  },
  methods: {
    ...mapActions("sources", ["newSource"]),
    addSource() {
      this.newSource();
    },
    selectSource(source) {
      this.selectedSource = source;
    }
  }
};
</script>

<style>
</style>
