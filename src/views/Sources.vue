<template>
  <section>
    <div class="mb-12 p-3 flex items-center justify-between">
      <h1>Sources</h1>
      <button
        class="p-3 bg-green-lighter text-green-darkest shadow rounded"
        @click="addSource"
      >New source</button>
    </div>
    <div class="flex">
      <aside class="w-1/3 p-3">
        <ul class="list-reset -my-4">
          <li
            v-for="(source, index) in sources"
            :key="index"
            class="p-4 rounded shadow-md my-4 cursor-pointer"
            :class="{'bg-blue-lightest': index === currentSource}"
            @click="selectSource({key:index})"
          >
            <div class="flex flex-col items-start">
              <div>{{ source.name }}</div>
              <div class="text-sm">{{ source.id }}</div>
              <div
                v-if="source.data"
                class="ml-auto text-sm"
              >{{ source.data.features ? source.data.features.length : source.data.length }} features</div>
            </div>
          </li>
        </ul>
      </aside>
      <section class="w-2/3 p-3">
        <SourceForm></SourceForm>
      </section>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

import SourceForm from "@/components/sources/Form.vue";

export default {
  name: "Sources",
  components: { SourceForm },
  data() {
    return {
      selectedSource: null
    };
  },
  computed: {
    ...mapState({
      sources: state => state.sources.list,
      currentSource: state => state.sources.currentSource
    })
  },
  methods: {
    ...mapActions("sources", ["newSource", "selectSource"]),
    addSource() {
      this.newSource();
    }
  }
};
</script>

<style>
</style>
