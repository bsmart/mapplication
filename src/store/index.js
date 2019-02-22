import Vue from "vue";
import Vuex from "vuex";
import map from "@/store/modules/map";
import sources from "@/store/modules/sources";
import layers from "@/store/modules/layers";
import deck from "@/store/modules/deck";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    map,
    sources,
    layers,
    deck
  },
  state: {},
  mutations: {
    initialize(state) {
      // Check if the ID exists
      if (localStorage.getItem("store")) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    }
  },
  actions: {}
});
