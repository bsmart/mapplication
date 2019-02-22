<template>
  <section>
    <Textfield title="ID" :id="id" :required="true" :value="id" @input="saveProps('id', $event)"/>
    <Checkbox title="Filled" id="filled" :value="filled" @input="saveProps('filled', $event)"/>
    <Checkbox title="Stroked" id="stroked" :value="stroked" @input="saveProps('stroked', $event)"/>
    <Range
      title="Opacity"
      id="opacity"
      :min="0"
      :max="1"
      :step=".01"
      :value="opacity"
      @input="saveProps('opacity', $event)"
    />
    <Checkbox
      title="Extruded"
      id="extruded"
      :value="extruded"
      @input="saveProps('extruded', $event)"
    />
    <Checkbox
      title="Wireframe"
      id="wireframe"
      :value="wireframe"
      @input="saveProps('wireframe', $event)"
    />
    <Number
      title="Line width scale"
      id="lineWidthScale"
      :value="lineWidthScale"
      @input="saveProps('lineWidthScale', $event)"
    />
    <Number
      title="Line width min pixels"
      id="lineWidthMinPixels"
      :value="lineWidthMinPixels"
      @input="saveProps('lineWidthMinPixels', $event)"
    />
    <Number
      title="Line width max pixels"
      id="lineWidthMaxPixels"
      :value="lineWidthMaxPixels"
      @input="saveProps('lineWidthMaxPixels', $event)"
    />
    <Checkbox
      title="Line joint rounded"
      id="lineJointRounded"
      :value="lineJointRounded"
      @input="saveProps('lineJointRounded', $event)"
    />
    <Number
      title="Line miter limit"
      id="lineMiterLimit"
      :value="lineMiterLimit"
      @input="saveProps('lineMiterLimit', $event)"
    />
    <Number
      title="Elevation scale"
      id="elevationScale"
      :value="elevationScale"
      @input="saveProps('elevationScale', $event)"
    />
    <Number
      title="Point radius scale"
      id="pointRadiusScale"
      :value="pointRadiusScale"
      @input="saveProps('pointRadiusScale', $event)"
    />
    <Number
      title="Point radius min pixels"
      id="pointRadiusMinPixels"
      :value="pointRadiusMinPixels"
      @input="saveProps('pointRadiusMinPixels', $event)"
    />
    <Number
      title="Point radius max pixels"
      id="pointRadiusMaxPixels"
      :value="pointRadiusMaxPixels"
      @input="saveProps('pointRadiusMaxPixels', $event)"
    />
    <Checkbox
      title="Line dash justified"
      id="lineDashJustified"
      :value="lineDashJustified"
      @input="saveProps('lineDashJustified', $event)"
    />
    <CodeWindow
      title="Get line color"
      id="getLineColor"
      :value="getLineColor"
      @input="saveProps('getLineColor', $event)"
    />
    <CodeWindow
      title="Get fill color"
      id="getFillColor"
      :value="getFillColor"
      @input="saveProps('getFillColor', $event)"
    />
    <CodeWindow
      title="Get radius"
      id="getRadius"
      :value="getRadius"
      @input="saveProps('getRadius', $event)"
    />
    <CodeWindow
      title="Get line width"
      id="getLineWidth"
      :value="getLineWidth"
      @input="saveProps('getLineWidth', $event)"
    />
    <CodeWindow
      title="Get elevation"
      id="getElevation"
      :value="getElevation"
      @input="saveProps('getElevation', $event)"
    />
    <CodeWindow
      title="Get line dash array"
      id="getLineDashArray"
      :value="getLineDashArray"
      @input="saveProps('getLineDashArray', $event)"
    />
    <button
      class="mx-2 my-2 px-3 py-2 bg-green-lighter text-green-darkest shadow rounded"
      @click.prevent="saveProps();"
    >Save properties</button>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import Textfield from "@/components/form/Textfield.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import CodeWindow from "@/components/form/CodeWindow.vue";
import Number from "@/components/form/Number.vue";
import Range from "@/components/form/Range.vue";

export default {
  name: "GeoJsonLayer",
  components: {
    Textfield,
    Checkbox,
    CodeWindow,
    Number,
    Range
  },
  props: [
    "opacity",
    "stroked",
    "filled",
    "extruded",
    "wireframe",
    "lineWidthScale",
    "lineWidthMinPixels",
    "lineWidthMaxPixels",
    "lineJointRounded",
    "lineMiterLimit",
    "elevationScale",
    "pointRadiusScale",
    "pointRadiusMinPixels",
    "pointRadiusMaxPixels",
    "lineDashJustified",
    "fp64",
    "getLineColor",
    "getFillColor",
    "getRadius",
    "getLineWidth",
    "getLineDashArray",
    "getElevation",
    "lightSettings",
    "id"
  ],
  computed: {
    ...mapState("layers", ["currentLayer"]),
    ...mapGetters({
      layer: "layers/currentLayer"
    })
  },
  methods: {
    ...mapActions("layers", ["saveLayer"]),
    saveProps(prop, event) {
      this.layer.props[prop] = event;
      this.saveLayer({ key: this.currentLayer, layer: this.layer });
    }
  }
};
</script>

<style>
</style>
