<template>
  <div>
    <label class="font-semibold" :class="{ 'text-red': required }" :for="id">{{ title }}</label>
    <input
      :id="id"
      :name="id"
      type="file"
      :size="size"
      :placeholder="placeholder"
      class="w-full border-2 rounded px-3 py-2"
      :class="{ 'bg-red-lightest': required, 'border-red-dark': required }"
      :required="required ? true : false"
      @input="handleInput"
    >
  </div>
</template>

<script>
export default {
  name: "FileUpload",
  props: ["title", "id", "size", "placeholder", "required"],
  methods: {
    handleInput(e) {
      let file = e.target.files[0];
      if (!file) {
        return;
      }
      let reader = new FileReader();
      reader.onload = e => {
        var contents = e.target.result;
        this.$emit("input", contents);
      };

      switch (file.type) {
        case "json":
          reader.readAsText(file);
          break;
        default:
          reader.readAsBinaryString(file);
      }
    }
  }
};
</script>

<style scoped>
</style>
