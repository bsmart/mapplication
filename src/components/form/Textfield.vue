<template>
  <div>
    <label class="font-semibold" :for="id">{{ title }}</label>
    <input
      :id="id"
      :name="id"
      type="text"
      :size="size"
      :placeholder="placeholder"
      class="w-full border-2 rounded px-3 py-2"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: "Textfield",
  props: ["title", "id", "size", "placeholder", "value"]
};
</script>

<style>
</style>
