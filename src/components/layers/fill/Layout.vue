<template>
  <div>
    <Checkbox
      title="Visible"
      class="my-3"
      id="visible"
      :required="!layout.visibility"
      v-model="visibility"
    ></Checkbox>
  </div>
</template>

<script>
import Checkbox from "@/components/form/Checkbox.vue";

export default {
  name: "Layout",
  components: {
    Checkbox
  },
  props: ["value"],
  computed: {
    layout: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    visibility: {
      get() {
        return this.value.visibility == "visible";
      },
      set(value) {
        this.value.visibility = value ? "visible" : "none";
      }
    }
  }
};
</script>

<style scoped>
</style>
