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
      <ul class="list-reset flex justify-between">
        <li class="mr-3">
          <span
            class="inline-block border border-blue rounded py-2 px-4 bg-blue hover:bg-blue-dark text-white"
          >Data</span>
        </li>
        <li class="mr-3">
          <span
            class="inline-block border border-white rounded hover:border-grey-lighter text-blue hover:bg-grey-lighter py-2 px-4"
          >Filters</span>
        </li>
        <li class="mr-3">
          <span class="inline-block py-2 px-4 text-grey-light cursor-not-allowed" href="#">Analytics</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Textfield from "@/components/form/Textfield.vue";
import { mapActions } from "vuex";

export default {
  name: "Form",
  components: {
    Textfield
  },
  props: ["index", "layer"],
  methods: {
    ...mapActions({
      save: "data/saveLayer"
    }),
    update(prop, value) {
      this.layer[prop] = value;
      this.save({ index: this.index, layer: this.layer });
    }
  }
};
</script>

<style>
</style>
