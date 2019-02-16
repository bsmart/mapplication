<template>
  <section v-if="layer" class="-my-4 shadow-md rounded p-4 flex flex-col">
    <h2 class="my-4">{{ layer.name }}</h2>
    <form>
      <Textfield
        title="Layer name"
        class="mb-3"
        id="layerName"
        :required="true"
        placeholder="Enter the name for this layer..."
        :value="layer.name"
        @input="updateName"
      />
      <Select
        class="my-3"
        :required="true"
        id="source"
        :value="source"
        @input="setSource"
        :options="sourceOptions"
        title="Source"
      ></Select>
      <button
        class="p-3 bg-green-lighter text-green-darkest shadow rounded"
        @click.prevent="reloadData"
      >Reload data</button>
      <h3 class="my-4">Functions</h3>
      <div>
        <CodeWindow
          title="Pre-process function"
          id="mapFunction"
          class="my-3"
          :value="layer.preFunction"
          @input="setPreFunction"
          rows="5"
        ></CodeWindow>
        <div
          v-if="preFunctionError"
          class="my-3 p-3 shadow-md rounded-lg bg-red-lightest border-2 border-red-dark text-red-darkest"
        >
          <span
            class="font-bold flex justify-center"
          >{{ preFunctionError.toString() || 'Coding error' }}</span>
        </div>
      </div>
      <div>
        <CodeWindow
          title="Map function"
          id="mapFunction"
          class="my-3"
          :value="layer.mapFunction"
          @input="setMapFunction"
          rows="5"
        ></CodeWindow>
        <div
          v-if="mapFunctionError"
          class="my-3 p-3 shadow-md rounded-lg bg-red-lightest border-2 border-red-dark text-red-darkest"
        >
          <span
            class="font-bold flex justify-center"
          >{{ mapFunctionError.toString() || 'Coding error' }}</span>
        </div>
        <button
          class="p-3 bg-green-lighter text-green-darkest shadow rounded"
          @click.prevent="mapData"
        >Apply map function</button>
      </div>
      <DataTable
        v-if="layer.props.data"
        :table-data="layer.props.data.features ? layer.props.data.features : layer.props.data"
        :size="5"
      ></DataTable>
      <!-- :properties="[...Set(Object.keys(layer.props.data[0]))]" -->
      <component v-if="layer.props" :is="layer.type" v-bind="layer.props"/>
    </form>
    <div class="flex items-center justify-end -mx-3">
      <button
        class="mx-3 my-2 px-3 py-2 bg-red-dark text-red-lightest shadow rounded"
        @click="deleteLayer({ key: currentLayer }); layer = null;"
      >Delete</button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import * as turf from "@turf/turf";
import _ from "lodash";

import Textfield from "@/components/form/Textfield.vue";
import Select from "@/components/form/Select.vue";
import DataTable from "@/components/DataTable.vue";
import CodeWindow from "@/components/form/CodeWindow.vue";
import GeoJsonLayer from "@/components/layers/GeoJsonLayer.vue";

export default {
  name: "LayerForm",
  components: {
    Textfield,
    Select,
    DataTable,
    CodeWindow,
    GeoJsonLayer
  },
  data() {
    return {
      source: "",
      mapFunction: "",
      mapFunctionError: null,
      mapFunctionParsing: false
    };
  },
  computed: {
    ...mapState({
      currentLayer: state => state.layers.currentLayer
    }),
    ...mapGetters({
      layer: "layers/currentLayer",
      getSource: "sources/getSource",
      mapSource: "sources/map"
    }),
    sourceOptions: {
      get() {
        var options = this.mapSource(val => {
          return {
            text: val.name,
            value: val.id
          };
        });
        return options;
      }
    }
  },
  methods: {
    ...mapActions("layers", ["saveLayer", "saveLayerMember", "deleteLayer"]),
    reloadData() {
      this.layer.props.data = Object.assign({}, this.source.data);
      this.saveLayer({ key: this.currentLayer, layer: this.layer });
    },
    setPreFunction: _.debounce(function(value) {
      this.preFunctionError = null;
      this.preFunctionParsing = true;
      try {
        new Function("data", value);
        this.saveLayerMember({
          name: "preFunction",
          value
        });
      } catch (error) {
        this.preFunctionError = error.message;
      } finally {
        this.preFunctionParsing = false;
      }
    }, 1000),
    setMapFunction: _.debounce(function(value) {
      this.mapFunctionError = null;
      this.mapFunctionParsing = true;
      try {
        new Function("value", "index", "array", value);
        this.saveLayerMember({
          name: "mapFunction",
          value
        });
      } catch (error) {
        this.mapFunctionError = error.message;
      } finally {
        this.mapFunctionParsing = false;
      }
    }, 1000),
    runPreprocess() {
      let data = this.layer.props.data;
      if (this.layer.preFunction) {
        data = data.features ? data.features : data;
        const callback = new Function("data", this.layer.preFunction);
        try {
          callback(data);
        } catch (error) {
          this.mapFunctionError = error.message;
        }
      }
    },
    mapData() {
      this.runPreprocess();
      this.mapFunctionError = null;
      let data = this.layer.props.data;
      if (this.layer.mapFunction) {
        data = data.features ? data.features : data;
        const callback = new Function(
          "value",
          "index",
          "array",
          this.layer.mapFunction
        );
        // eslint-disable-next-line
        try {
          data = data.map(callback, this);
          if (data) {
            this.layer.props.data = this.layer.props.data.features
              ? turf.featureCollection(data)
              : data;
            this.saveLayer({ key: this.currentLayer, layer: this.layer });
          }
        } catch (error) {
          this.mapFunctionError = error.message;
        }
      }
    },
    setSource(id) {
      this.source = id;
      // make a copy of the data
      this.layer.props.data = Object.assign({}, this.getSource(id).data);
      this.saveLayer({ key: this.currentLayer, layer: this.layer });
    },
    updateName(name) {
      this.layer.name = name;
      this.saveLayer({ key: this.currentLayer, layer: this.layer });
    }
  }
};
</script>

<style>
</style>
