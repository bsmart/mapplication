<template>
  <div>
    <h3>{{ layer.name }}</h3>
    <div>
      <span>{{ layer.id }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Summary",
  props: ["layer"]
};
</script>

<style>
</style>
