<template>
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
    <DataTable
      v-if="source.data && source.data.features"
      :table-data="source.data.features"
      :size="5"
    ></DataTable>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Textfield from "@/components/form/Textfield.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import Select from "@/components/form/Select.vue";
import File from "./File.vue";
import Url from "./Url.vue";
import DataTable from "@/components/layer/DataTable.vue";

export default {
  name: "SourceForm",
  components: {
    Textfield,
    FileUpload,
    Select,
    DataTable,
    File,
    Url
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
          text: "Url",
          value: "Url"
        }
      ],
      currentSourceComponent: "File"
    };
  },
  computed: {
    ...mapGetters("sources", ["getSource"]),
    source: {
      get() {
        return this.getSource(this.sourceName);
      },
      set() {
        this.saveSource({ key: this.source.id, source: this.source });
      }
    }
  },
  methods: {
    ...mapActions("sources", ["saveSource", "deleteSource"]),
    updateData(contents) {
      let data = JSON.parse(contents);
      this.source.data = data;
    },
    updateName(name) {
      this.deleteSource(this.source.name);
      this.source.name = name;
      this.saveSource({ key: this.source.name, source: this.source });
    }
  }
};
</script>

<style>
</style>
