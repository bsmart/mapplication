<template>
  <div>
    <FileUpload
      title="Name"
      class="mb-3"
      id="name"
      placeholder="Choose a file to load data from..."
      required="true"
      :value="file"
      @chunk="addChunk"
      @progress="updateProgress"
      @done="done"
    ></FileUpload>
    <div v-if="progress" class="shadow w-full bg-fog-light">
      <div
        class="bg-blue-lighter text-xs leading-none py-1 text-center text-blue-darkest"
        :style="{ width: progress + '%' }"
      >{{ progress }}%</div>
    </div>
    <div v-if="processing" class="shadow w-full bg-fog-light">
      <div
        class="bg-blue-lighter text-xs leading-none py-1 text-center text-blue-darkest"
      >Processing...</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import FileUpload from "@/components/form/FileUpload.vue";

export default {
  name: "File",
  components: {
    FileUpload
  },
  data() {
    return {
      file: "",
      progress: null,
      processing: false,
      dataString: ""
    };
  },
  methods: {
    ...mapActions("sources", ["addDataChunk", "saveData"]),
    updateProgress(e) {
      this.progress = e * 100;
    },
    addChunk(chunk) {
      this.dataString = this.dataString.concat(chunk);
    },
    done() {
      this.processing = true;
      this.parseData().then(data => {
        this.processing = false;
        this.dataString = "";
        this.saveData({ data });
      });
      this.progress = null;
    },
    parseData() {
      return new Promise(resolve => {
        // This stands in for 'worker.js':
        var blob = new Blob(
          [
            `this.onmessage = function(message) {
              var json = JSON.parse(message.data);
              json = json.features ? json.features : json;
              var length = Object.keys(json).length,
                index = 0;
              for (const key in json) {
                const item = json[key];
                postMessage({
                  status: index / length,
                  item
                });
                index = index + 1;
              }
              postMessage({
                status: "DONE"
              });
            };`
          ],
          { type: "text/javascript" }
        );
        var workerUrl = URL.createObjectURL(blob);
        const data = [];

        // Main script:
        var w = new Worker(workerUrl);
        w.onmessage = message => {
          if (message.data.status === "DONE") {
            resolve(data);
          } else {
            data.push(message.data.item);
          }
        };

        w.postMessage(this.dataString.trim());
      });
    }
  }
};
</script>

<style>
</style>
