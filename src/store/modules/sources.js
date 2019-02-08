import Source from "@/components/source/model";

export default {
  namespaced: true,
  state: {
    currentSource: 0,
    list: []
  },
  getters: {
    sources: state => {
      return state.list;
    },
    getSource: state => key => {
      return state ? state.list[key] : null;
    },
    currentSource: state => {
      return state.list[state.currentSource];
    }
  },
  actions: {
    newSource({ commit }) {
      let source = new Source();
      commit("setSource", { key: source.name, source });
    },
    saveSource({ commit }, { key, source }) {
      commit("setSource", { key, source });
    },
    deleteSource({ commit }, { name }) {
      commit("deleteSource", { name });
    }
  },
  mutations: {
    setSource(state, { key, source }) {
      state[key] = source;
    },
    deleteSource(state, { name }) {
      delete state[name];
    }
  }
};
