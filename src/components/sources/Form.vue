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
        v-if="!source.data"
        title="Source type"
        class="my-3"
        :required="true"
        id="sourceType"
        v-model="currentSourceComponent"
        :options="sourceOptions"
      ></Select>
      <component v-if="!source.data" v-bind:is="currentSourceComponent"></component>
    </form>
    <DataTable
      v-if="source.data && source.data.features"
      :table-data="source.data.features"
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
import Textfield from "@/components/form/Textfield.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import Select from "@/components/form/Select.vue";
import File from "./File.vue";
import Web from "./Web.vue";
import DataTable from "@/components/DataTable.vue";

export default {
  name: "SourceForm",
  components: {
    Textfield,
    FileUpload,
    Select,
    DataTable,
    File,
    Web
  },
  props: {
    sourceName: {
      type: String,
      default: "new-source"
    }
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
      currentSourceComponent: "File"
    };
  },
  computed: {
    ...mapState("sources", ["currentSource"]),
    ...mapGetters({
      source: "sources/currentSource"
    })
  },
  methods: {
    ...mapActions("sources", ["saveSource", "deleteSource"]),
    updateData(contents) {
      let data = JSON.parse(contents);
      this.source.data = data;
      this.saveSource({ key: this.currentSource, source: this.source });
    },
    clearData() {
      this.source.data = null;
      this.saveSource({ key: this.currentSource, source: this.source });
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
