<template>
  <div :class="{ 'text-red': required }">
    <label class="font-semibold" :for="id">{{ title }}</label>
    <input
      :id="id"
      :name="id"
      type="text"
      :size="size"
      :placeholder="placeholder"
      class="w-full border-2 rounded px-3 py-2"
      :class="{ 'bg-red-lightest': required, 'border-red-dark': required }"
      :required="required ? true : false"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: "Textfield",
  props: ["title", "id", "size", "placeholder", "required", "value"]
};
</script>

<style>
</style>
