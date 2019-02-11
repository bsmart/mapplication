<template>
  <div :class="{ 'text-red': required }">
    <label class="block mb-1 font-semibold" :for="id">{{ title }}</label>
    <select
      class="w-full border-2 rounded px-3 py-2"
      :id="id"
      :name="id"
      :multiple="multiple ? true : false"
      :class="{ 'bg-red-lightest': required, 'border-red-dark': required }"
      :required="required ? true : false"
      :value="value"
      @input="handleInput"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >{{ option.text }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: ["title", "id", "options", "required", "multiple", "value"],
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style>
</style>
