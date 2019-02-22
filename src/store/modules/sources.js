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
    saveData({ commit }, data) {
      commit("setData", { data });
    },
    addDataChunk({ commit }, chunk) {
      commit("addDataChunk", { chunk });
    },
    parseData({ commit, state }) {
      return new Promise((resolve, reject) => {
        try {
          const json = JSON.parse(state.dataString);
          commit("setData", {
            data: json
          });
          resolve();
        } catch (err) {
          reject(null);
        }
      });
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
    setData(state, { data }) {
      state.dataString = "";
      state.list[state.currentSource].data = data;
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
