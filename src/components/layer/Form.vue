<template>
  <div>
    <Textfield
      title="Name"
      class="mb-3"
      id="name"
      placeholder="Enter a name for the layer..."
      required="true"
      :value="layer.name"
      @input="update('name', $event)"
    ></Textfield>
    <div>
      <FileUpload
        title="Name"
        class="mb-3"
        id="name"
        placeholder="Choose a file to load data from..."
        required="true"
        :value="layer.data"
        @input="addData"
      ></FileUpload>
    </div>
  </div>
</template>

<script>
import Textfield from "@/components/form/Textfield.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import { mapActions } from "vuex";

export default {
  name: "Form",
  components: {
    Textfield,
    FileUpload
  },
  props: ["index", "layer"],
  methods: {
    ...mapActions({
      save: "data/saveLayer"
    }),
    update(prop, value) {
      this.layer[prop] = value;
      this.save({ index: this.index, layer: this.layer });
    },
    addData(contents) {
      this.layer.data = JSON.parse(contents);
      this.save({ index: this.index, layer: this.layer });
    }
  }
};
</script>

<style>
</style>
