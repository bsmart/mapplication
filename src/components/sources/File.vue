<template>
  <div>
    <FileUpload
      title="Name"
      class="mb-3"
      id="name"
      placeholder="Choose a file to load data from..."
      required="true"
      :value="file"
      @input="addData"
    ></FileUpload>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import FileUpload from "@/components/form/FileUpload.vue";

export default {
  name: "File",
  components: {
    FileUpload
  },
  data() {
    return {
      file: ""
    };
  },
  methods: {
    ...mapActions("sources", ["saveData"]),
    addData(contents) {
      var data = JSON.parse(contents);
      this.saveData(data);
    }
  }
};
</script>

<style>
</style>
