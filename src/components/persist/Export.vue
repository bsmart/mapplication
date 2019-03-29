<template>
  <button
    class="p-3 bg-green-lighter text-green-darkest shadow rounded"
    @click.prevent="exportData"
  >
    Export
  </button>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Export",
  computed: {
    ...mapState({state: state => state})
  },
  methods: {
    exportData(){
      const a = document.createElement('a');
      let json = JSON.stringify(this.$store.state);
      let blob = new Blob([json], {type: 'application/json'});
      let url = URL.createObjectURL(blob);
      a.href = url;
      a.download = 'mapplication-state.json';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
    }
  }
};
</script>

<style scoped>
</style>
