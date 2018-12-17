import Vue from "vue";
import Vuex from "vuex";
import map from "@/store/modules/map";
import data from "@/store/modules/data";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    map,
    data
  },
  state: {},
  mutations: {},
  actions: {}
});
