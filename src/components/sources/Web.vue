<template>
  <section>
    <Textfield title="Url" :required="true" v-model="url"></Textfield>
    <details class="my-3 p-3 shadow-md rounded-lg">
      <summary class="font-bold">Headers</summary>
      <div class="p-3">
        <div class="flex items-center" v-for="header in headers" :key="header.type">
          <Textfield title="Header type" v-model="header.type"/>
          <Textfield title="Header value" class="ml-3 flex-grow" v-model="header.value"/>
          <button
            class="ml-3 px-3 py-2 bg-red-dark text-red-lightest rounded"
            @click.prevent="removeHeader(index)"
          >X</button>
        </div>
        <button
          class="my-3 rounded shadow px-3 py-2 bg-green-lighter text-green-darkest"
          @click.prevent="addHeader"
        >Add header</button>
      </div>
    </details>
    <details class="my-3 p-3 shadow-md rounded-lg">
      <summary class="font-bold">Query parameters</summary>
      <div class="p-3">
        <div class="flex items-end" v-for="(p, index) in parameters" :key="p.name">
          <Textfield title="Parameter name" v-model="p.name"/>
          <Textfield title="Parameter value" class="ml-3 flex-grow" v-model="p.value"/>
          <button
            class="ml-3 px-3 py-2 bg-red-dark text-red-lightest rounded"
            @click.prevent="removeParameter(index)"
          >
            <i v-html="trashCan"/>
          </button>
        </div>
        <button
          class="my-3 rounded shadow px-3 py-2 bg-green-lighter text-green-darkest"
          @click.prevent="addParameter"
        >Add parameter</button>
      </div>
    </details>
    <div>
      <button
        class="my-3 rounded shadow px-3 py-2 bg-green-lighter text-green-darkest"
        @click.prevent="getData"
      >Get data</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import feather from "feather-icons";
import { mapActions } from "vuex";

import Textfield from "@/components/form/Textfield.vue";

export default {
  name: "Web",
  components: {
    Textfield
  },
  data() {
    return {
      url: "",
      headers: [],
      parameters: [],
      trashCan: feather.icons["trash"].toSvg()
    };
  },
  methods: {
    ...mapActions("sources", ["saveData"]),
    addHeader() {
      this.headers.push({});
    },
    removeHeader(index) {
      this.headers.splice(index, 1);
    },
    addParameter() {
      this.parameters.push({});
    },
    removeParameter(index) {
      this.parameters.splice(index, 1);
    },
    getData() {
      axios
        .get(this.url, {
          params: this.parameters.reduce((curr, val) => {
            if (val && val.name) {
              curr[val.name] = val.value;
            }
          }),
          headers: this.headers.reduce((curr, val) => {
            if (val && val.type) {
              curr[val.type] = val.value;
            }
          })
        })
        .then(val => {
          let data = val.data;
          this.saveData(data);
        });
    }
  }
};
</script>

<style>
</style>
