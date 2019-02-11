import Source from "@/components/sources/model";

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
      commit("addSource", { source });
    },
    selectSource({ commit }, { key }) {
      commit("setCurrentSource", { key });
    },
    saveSource({ commit }, { key, source }) {
      commit("setSource", { key, source });
    },
    saveData({ commit, state }, data) {
      var source = state.list[state.currentSource];
      source.data = data;
      commit("setSource", { key: state.currentSource, source });
    },
    deleteSource({ commit }, { key }) {
      commit("deleteSource", { key });
    }
  },
  mutations: {
    addSource(state, { source }) {
      state.list.push(source);
    },
    setCurrentSource(state, { key }) {
      state.currentSource = key;
    },
    setSource(state, { key, source }) {
      state.list[key] = source;
    },
    deleteSource(state, { key }) {
      state.list.splice(key, 1);
      state.currentSource = null;
    }
  }
};
