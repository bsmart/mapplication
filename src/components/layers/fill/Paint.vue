<template>
  <div>
    <Checkbox title="Antialias" class="my-3" id="visible" v-model="paint['fill-antialias']"></Checkbox>
    <label for="opacity">Opacity</label>
    <vue-slider
      id="opacity"
      v-model="paint['fill-opacity']"
      width="auto"
      :height="6"
      direction="horizontal"
      :dotSize="16"
      eventType="auto"
      :min="0"
      :max="1"
      :interval=".01"
      :startAnimation="false"
      :tooltipMerge="true"
      :processDragable="false"
      :minRange="null"
      :maxRange="null"
      :fixed="false"
      :debug="false"
      :disabled="false"
      :show="true"
      :enableCross="true"
      :realTime="false"
      tooltip="always"
      :clickable="true"
      tooltipDir="top"
      :piecewise="false"
      :lazy="false"
      :useKeyboard="true"
      :reverse="false"
      :speed="0.5"
      :focusStyle="null"
      :bgStyle="null"
      :sliderStyle="null"
      :tooltipStyle="null"
      :processStyle="null"
      :piecewiseStyle="null"
      :disabledStyle="null"
    />
    <label for="fillColor">Color</label>
    <v-select id="fillColor" :options="colorOptions" label="name" v-model="color">
      <template slot="option" slot-scope="option">
        <span class="flex items-center">
          <span class="flex h-12 w-12 mr-3 border rounded" :class="`bg-${option.name}`"></span>
          <span>{{ option.name }}</span>
        </span>
      </template>
    </v-select>
    <label for="fillOutlineColor">Outline Color</label>
    <v-select id="fillOutlineColor" :options="colorOptions" label="name" v-model="outlineColor">
      <template slot="option" slot-scope="option">
        <span class="flex items-center">
          <span class="flex h-12 w-12 mr-3 border rounded" :class="`bg-${option.name}`"></span>
          <span>{{ option.name }}</span>
        </span>
      </template>
    </v-select>
  </div>
</template>

<script>
import vueSlider from "vue-slider-component";
import vSelect from "vue-select";

import tailwindConfig from "../../../../tailwind.config";

import Checkbox from "@/components/form/Checkbox.vue";

export default {
  name: "Paint",
  components: {
    vueSlider,
    vSelect,
    Checkbox
  },
  props: ["value"],
  data() {
    return {
      colors: tailwindConfig.colors,
      paintProperties: {
        "fill-antialias": true,
        "fill-opacity": 1,
        "fill-color": "#000000",
        "fill-outline-color": "#000000"
      }
    };
  },
  computed: {
    paint: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    color: {
      get() {
        return (
          this.colorOptions.find(value => {
            return value.value == this.paint["fill-color"];
          }) || { name: "marine", value: tailwindConfig.colors.marine }
        );
      },
      set(option) {
        this.paint["fill-color"] = option.value;
      }
    },
    outlineColor: {
      get() {
        return (
          this.colorOptions.find(value => {
            return value.value == this.paint["fill-outline-color"];
          }) || {
            name: "marine-darkest",
            value: tailwindConfig.colors["marine-darkest"]
          }
        );
      },
      set(option) {
        this.paint["fill-outline-color"] = option.value;
      }
    },
    colorOptions() {
      let options = Object.keys(tailwindConfig.colors).map(key => {
        return {
          name: key,
          value: tailwindConfig.colors[key]
        };
      });
      return options;
    }
  }
};
</script>

<style scoped>
</style>
