import Source from "@/components/sources/model";

export default {
  namespaced: true,
  state: {
    dataString: "",
    currentSource: 0,
    list: []
  },
  getters: {
    sources: state => {
      return state.list;
    },
    getSource: state => id => {
      return state.list.find(val => {
        return val.id == id;
      });
    },
    currentSource: state => {
      return state.list[state.currentSource];
    },
    map: state => map => {
      return state.list.map(map);
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
      return new Promise((resolve, reject) => {
        try {
          commit("setSource", { key, source });
          resolve();
        } catch {
          reject();
        }
      });
    },
    saveData({ commit, state }, { data }) {
      commit("setData", { key: state.currentSource, data });
    },
    addDataChunk({ commit }, chunk) {
      commit("addDataChunk", { chunk });
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
    setData(state, { key, data }) {
      state.dataString = "";
      state.list[key].data = data;
    },
    addData(state, { key, data }) {
      state.list[key].data.features
        ? state.list[key].data.features.push(data)
        : state.list[key].data.push(data);
    },
    addDataChunk(state, { chunk }) {
      state.dataString += chunk;
    },
    deleteSource(state, { key }) {
      state.list.splice(key, 1);
      state.currentSource = null;
    }
  }
};
