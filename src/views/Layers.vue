<template>
  <section>
    <div class="mb-12 p-3 flex items-center justify-between">
      <h1>Layers</h1>
      <div class="relative">
        <div
          class="flex items-center p-3 bg-green-lighter text-green-darkest shadow rounded cursor-pointer"
          @click="showLayerSelect = !showLayerSelect"
        >
          <span>New layer</span>
          <span class="flex items-center" v-html="chevronDown"/>
        </div>
        <ul
          v-show="showLayerSelect"
          class="absolute pin-r py-1 list-reset bg-fog rounded-lg shadow-md"
        >
          <li
            v-for="(type, index) in Object.keys(layerTypes)"
            :key="index"
            class="p-3 cursor-pointer hover:bg-fog-dark"
            @click="addLayer(type)"
          >{{ type }}</li>
        </ul>
      </div>
    </div>
    <div class="flex">
      <aside class="w-1/3 p-3">
        <ul class="list-reset -my-4">
          <li
            v-for="(layer, index) in layers"
            :key="index"
            class="p-4 rounded shadow-md my-4 cursor-pointer"
            :class="{'bg-blue-lightest': index === currentLayer}"
            @click="selectLayer({key:index})"
          >
            <div class="flex flex-col items-start">
              <div>{{ layer.name }}</div>
              <div class="text-sm">{{ layer.id }}</div>
            </div>
          </li>
        </ul>
      </aside>
      <section class="w-2/3 p-3">
        <LayerForm/>
      </section>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import feather from "feather-icons";
import { GeoJsonLayer } from "@deck.gl/layers";

import LayerForm from "@/components/layers/Form.vue";

export default {
  name: "Layers",
  components: { LayerForm },
  data() {
    return {
      chevronDown: feather.icons["chevron-down"].toSvg(),
      selectedLayer: null,
      layerTypes: {
        GeoJsonLayer
      },
      showLayerSelect: false
    };
  },
  computed: {
    ...mapState({
      layers: state => state.layers.list,
      currentLayer: state => state.layers.currentLayer
    })
  },
  methods: {
    ...mapActions("layers", ["newLayer", "selectLayer"]),
    addLayer(type) {
      this.newLayer({ type });
    }
  }
};
</script>

<style>
</style>
