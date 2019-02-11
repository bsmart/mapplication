<template>
  <div class="flex flex-col">
    <table class="block overflow-x-scroll table-auto border-collapse text-left w-full mb-4">
      <thead>
        <tr class="border-b border-x">
          <th
            class="uppercase font-semibold p-2"
            v-for="(property, index) in properties"
            :key="index"
          >{{ property }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-blue-lightest" v-for="(item, index) in paginatedData" :key="index">
          <td
            class="border p-2"
            v-for="(property, propertyIndex) in properties"
            :key="propertyIndex"
          >{{ item.properties[property] }}</td>
        </tr>
      </tbody>
    </table>
    <div class="self-center flex items-center">
      <button
        class="p-2 bg-fog-light hover:bg-fog text-fog-darkest border rounded border-fog-dark"
        @click="previousPage"
        :disabled="pageNumber==0"
      >
        <i class="flex" v-html="chevronLeft"></i>
      </button>
      <span class="mx-2">Page {{ pageNumber + 1 }} of {{ pageCount }}</span>
      <button
        class="p-2 bg-fog-light hover:bg-fog text-fog-darkest border rounded border-fog-dark"
        @click="nextPage"
        :disabled="pageNumber >= pageCount - 1"
      >
        <i class="flex" v-html="chevronRight"></i>
      </button>
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";

export default {
  name: "DataTable",
  props: {
    tableData: {
      type: Array,
      required: false,
      default: null
    },
    size: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      pageNumber: 0,
      chevronLeft: feather.toSvg("chevron-left"),
      chevronRight: feather.toSvg("chevron-right")
    };
  },
  computed: {
    properties: {
      get() {
        let properties = [];
        if (this.tableData) {
          for (const key in this.tableData[0].properties) {
            if (this.tableData[0].properties.hasOwnProperty(key)) {
              properties.push(key);
            }
          }
        }
        return properties;
      }
    },
    pageCount() {
      let l = this.tableData.length | 0,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;

      return this.tableData.slice(start, end);
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    previousPage() {
      this.pageNumber--;
    }
  }
};
</script>

<style scoped>
</style>
