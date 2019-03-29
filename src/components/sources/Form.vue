<template>
  <section v-if="source" class="shadow-md rounded p-4 flex flex-col">
    <form>
      <Textfield
        title="Source name"
        class="mb-3"
        id="sourceName"
        :required="true"
        placeholder="Enter the name for this source..."
        :value="source.name"
        @input="updateName"
      ></Textfield>
      <Select
        title="Source type"
        class="my-3"
        :required="true"
        id="sourceType"
        v-model="currentSourceComponent"
        :options="sourceOptions"
      ></Select>
      <component v-bind:is="currentSourceComponent"></component>
      <CodeWindow
        title="Map function"
        id="mapFunction"
        class="my-3"
        :value="source.mapFunction"
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
      <CodeWindow
        title="Reduce function"
        id="reduceFunction"
        class="my-3"
        :value="source.reduceFunction"
        @input="setReduceFunction"
        rows="5"
      ></CodeWindow>
      <div
        v-if="reduceFunctionError"
        class="my-3 p-3 shadow-md rounded-lg bg-red-lightest border-2 border-red-dark text-red-darkest"
      >
        <span
          class="font-bold flex justify-center"
        >{{ reduceFunctionError.toString() || 'Coding error' }}</span>
      </div>
      <button
        class="p-3 bg-green-lighter text-green-darkest shadow rounded"
        @click.prevent="reduceData"
      >Apply reduce function</button>
    </form>
    <div v-if="progress" class="shadow w-full bg-fog-light">
      <div
        class="bg-blue-lighter text-xs leading-none py-1 text-center text-blue-darkest"
        :style="{ width: progress * 100 + '%' }"
      >{{ progress * 100 }}%</div>
    </div>
    <DataTable
      v-if="source.data && source.data.features ? source.data.features[0] : source.data[0]"
      :table-data="source.data.features ? source.data.features : source.data"
      :size="5"
    ></DataTable>
    <div class="flex items-center justify-end -mx-3">
      <button
        v-if="source.data"
        class="mx-2 my-2 px-3 py-2 bg-blue-dark text-blue-lightest shadow rounded"
        @click="clearData"
      >Clear data</button>
      <button
        class="mx-2 my-2 px-3 py-2 bg-red-dark text-red-lightest shadow rounded"
        @click="deleteSource({ key: currentSource }); source = null;"
      >Delete</button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
// eslint-disable-next-line
import * as turf from "@turf/turf";
import _ from "lodash";

import Textfield from "@/components/form/Textfield.vue";
import CodeWindow from "@/components/form/CodeWindow.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import Select from "@/components/form/Select.vue";
import File from "./File.vue";
import Web from "./Web.vue";
import DataTable from "@/components/DataTable.vue";

export default {
  name: "SourceForm",
  components: {
    Textfield,
    CodeWindow,
    FileUpload,
    Select,
    DataTable,
    File,
    Web
  },
  data() {
    return {
      sourceOptions: [
        {
          text: "File",
          value: "File"
        },
        {
          text: "Web",
          value: "Web"
        }
      ],
      processing: false,
      currentSourceComponent: "File",
      mapFunctionError: null,
      reduceFunctionError: null
    };
  },
  computed: {
    ...mapState("sources", ["currentSource", "progress"]),
    ...mapGetters({
      source: "sources/currentSource"
    })
  },
  methods: {
    ...mapActions("sources", ["saveSource", "deleteSource"]),
    clearData() {
      this.source.data = null;
      this.saveSource({ key: this.currentSource, source: this.source });
    },
    setMapFunction: _.debounce(function(value) {
      this.mapFunctionError = null;
      this.mapFunctionParsing = true;
      try {
        new Function("value", "index", "array", value);
        this.source.mapFunction = value;
        this.saveSource({ key: this.currentSource, source: this.source });
      } catch (error) {
        this.mapFunctionError = error.message;
      } finally {
        this.mapFunctionParsing = false;
      }
    }, 1000),
    setReduceFunction: _.debounce(function(value) {
      this.reduceFunctionError = null;
      this.processing = true;
      try {
        new Function("value", "index", "array", value);
        this.source.reduceFunction = value;
        this.saveSource({ key: this.currentSource, source: this.source }).then(
          () => {
            this.processing = false;
          }
        );
      } catch (error) {
        this.reduceFunctionError = error.message;
        this.processing = false;
      }
    }, 1000),
    mapData() {
      this.processing = true;
      let data = this.source.data;
      if (this.source.mapFunction) {
        // is this GeoJson data?
        data = data.features ? data.features : data;
        // set up an array.map callback function with all parameters
        const callback = new Function(
          "value",
          "index",
          "array",
          this.source.mapFunction
        );
        try {
          data = data.map(callback, this);
          if (data) {
            this.source.data = this.source.data.features
              ? turf.featureCollection(data)
              : data;
            this.saveSource({
              key: this.currentSource,
              source: this.source
            }).then(() => {
              this.processing = false;
            });
          }
        } catch (error) {
          this.mapFunctionError = error.message;
          this.processing = false;
        }
      }
    },
    reduceData() {
      let data = this.source.data;
      if (this.source.reduceFunction) {
        data = data.features ? data.features : data;
        // eslint-disable-next-line
        const callback = new Function(
          "acc",
          "curr",
          "idx",
          "src",
          this.source.reduceFunction
        );
        data = data.reduce(callback, []);
        if (data) {
          this.source.data = this.source.data.features
            ? turf.featureCollection(data)
            : data;
          this.saveSource({ key: this.currentSource, source: this.source });
        }
      }
    },
    updateName(name) {
      this.source.name = name;
      this.saveSource({ key: this.currentSource, source: this.source });
    }
  }
};
</script>

<style>
</style>
