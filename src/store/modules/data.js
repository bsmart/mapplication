import _ from "lodash";

function move(array, fromIndex, toIndex) {
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
}

export default {
  namespaced: true,
  state: {
    layers: []
  },
  getters: {},
  mutations: {
    addLayer(state, { layer }) {
      state.layers.push(layer);
    },
    removeLayer(state, { index }) {
      state.layers.splice(index, 1);
    },
    saveLayer(state, { index, layer }) {
      _.merge(state.layers[index], layer);
    },
    move(state, { index, newIndex }) {
      move(state.layers, index, newIndex);
    }
  },
  actions: {
    addLayer({ commit }, layer) {
      commit("addLayer", { layer });
    },
    saveLayer({ commit }, { index, layer }) {
      commit("saveLayer", { index, layer });
    },
    removeLayer({ commit }, index) {
      commit("removeLayer", { index });
    },
    moveUp({ commit }, index) {
      const newIndex = index - 1;
      commit("move", { index, newIndex });
    },
    moveDown({ commit }, index) {
      const newIndex = index + 1;
      commit("move", { index, newIndex });
    }
  }
};
