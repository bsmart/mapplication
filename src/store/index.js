import Vue from "vue";
import Vuex from "vuex";
import map from "@/store/modules/map";
import sources from "@/store/modules/sources";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    map,
    sources
  },
  state: {},
  mutations: {},
  actions: {}
});
