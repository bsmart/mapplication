import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// add tailwind config to the window so any global scope function can access it

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
