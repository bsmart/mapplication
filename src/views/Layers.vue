<template>
  <section class="container mx-auto mt-8">
    <h1 class="mb-8">Manage layers</h1>
    <div class="-mx-4 flex flex-col md:flex-row">
      <aside class="md:w-1/3 px-4 flex flex-col">
        <div
          class="pb-4 border-b flex flex-col md:flex-row items-start md:items-center justify-between"
        >
          <h2 class>Layers</h2>
          <button
            class="px-3 py-2 bg-blue text-white border rounded border-blue-dark"
            @click="newLayer"
          >Add new layer</button>
        </div>
        <transition-group name="flip-list" class="list-reset" tag="ol">
          <li
            class="p-2 hover:bg-grey-lighter flex flex-row cursor-pointer"
            v-for="(l, index) in layers"
            :class="{ 'bg-blue-lightest' : index == activeIndex }"
            :key="l.id"
          >
            <div
              class="self-center px-2 py-1 border-2 border-grey-darkest rounded-full font-bold"
            >{{ index + 1 }}</div>
            <div class="px-2 flex flex-col">
              <button
                class="p-1 bg-grey-light border rounded-t hover:bg-grey-dark"
                @click="up(index)"
              >
                <i v-html="chevronUp"></i>
              </button>
              <button
                class="p-1 bg-grey-light border rounded-b hover:bg-grey-dark"
                @click="down(index)"
              >
                <i v-html="chevronDown"></i>
              </button>
            </div>
            <div class="flex flex-col justify-between">
              <LayerSummary :layer="l"/>
              <div class="-mx-1">
                <button
                  class="mx-1 px-2 py-1 bg-blue text-white text-md border rounded border-blue-dark"
                  @click="edit(index)"
                >Edit</button>
                <button
                  class="mx-1 px-2 py-1 bg-red text-white text-md border rounded border-red-dark"
                  @click="remove(index)"
                >Delete</button>
              </div>
            </div>
          </li>
        </transition-group>
      </aside>
      <section v-if="activeLayer" class="md:w-2/3 px-4">
        <LayerForm :index="activeIndex" :layer="activeLayer"/>
      </section>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import feather from "feather-icons";

import Layer from "@/models/layer";

import LayerSummary from "@/components/layer/Summary.vue";
import LayerForm from "@/components/layer/Form.vue";

export default {
  name: "Layers",
  components: {
    LayerSummary,
    LayerForm
  },
  data() {
    return {
      activeIndex: null,
      activeLayer: null,
      chevronDown: feather.toSvg("chevron-down"),
      chevronUp: feather.toSvg("chevron-up")
    };
  },
  computed: {
    ...mapState({
      layers: state => state.data.layers
    })
  },
  methods: {
    ...mapActions("data", [
      "addLayer",
      "saveLayer",
      "removeLayer",
      "moveUp",
      "moveDown"
    ]),
    newLayer() {
      this.activeLayer = new Layer(this.layers.length + 1);
      this.addLayer(this.activeLayer);
      this.activeIndex = this.layers.length - 1;
    },
    clearActive() {
      this.activeIndex = null;
      this.activeLayer = null;
    },
    edit(index) {
      this.activeIndex = index;
      this.activeLayer = this.layers[index];
    },
    save() {
      this.saveLayer({ index: this.activeIndex, layer: this.activeLayer });
    },
    remove(index) {
      if (index === this.activeIndex) {
        this.clearActive();
      }
      this.removeLayer(index);
    },
    up(index) {
      if (this.activeIndex == index) {
        this.activeIndex = index - 1;
      } else if (index - 1 == this.activeIndex) {
        this.activeIndex = this.activeIndex + 1;
      }
      this.moveUp(index);
    },
    down(index) {
      if (this.activeIndex == index) {
        this.activeIndex = index + 1;
      } else if (index + 1 == this.activeIndex) {
        this.activeIndex = this.activeIndex - 1;
      }
      this.moveDown(index);
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
</style>
