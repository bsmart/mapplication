import LayerFactory from "@/components/layers/factory";

export default {
  namespaced: true,
  state: {
    currentLayer: 0,
    list: []
  },
  getters: {
    layers: state => {
      return state.list;
    },
    getLayer: state => key => {
      return state ? state.list[key] : null;
    },
    currentLayer: state => {
      return state.list[state.currentLayer];
    }
  },
  actions: {
    newLayer({ commit }, { type }) {
      let layer = LayerFactory(type);
      commit("addLayer", { layer });
    },
    selectLayer({ commit }, { key }) {
      commit("setCurrentLayer", { key });
    },
    saveLayer({ commit }, { key, layer }) {
      commit("setLayer", { key, layer });
    },
    saveLayerMember({ commit, state }, { name, value }) {
      commit("setMember", { key: state.currentLayer, name, value });
    },
    saveProperties({ commit, state }, { props }) {
      commit("setProperties", { key: state.currentLayer, props });
    },
    saveData({ commit, state }, data) {
      commit("setData", { key: state.currentLayer, data });
    },
    deleteLayer({ commit }, { key }) {
      commit("deleteLayer", { key });
    },
    export({ state }) {
      return new Promise((resolve, reject) => {
        try {
          let ids = [];
          for (const l of state.list) {
            let { id, name, type, mapFunction, preFunction } = l;
            let { data, ...rest } = l.props;
            ids.push(id);
            localStorage.setItem(
              `layer:${id}`,
              JSON.stringify({
                id,
                name,
                type,
                props: rest,
                mapFunction,
                preFunction
              })
            );
            localStorage.setItem(`layer:${id}:data`, JSON.stringify(data));
          }
          localStorage.setItem(`layers`, JSON.stringify(ids));
          resolve();
        } catch {
          reject();
        }
      });
    }
  },
  mutations: {
    addLayer(state, { layer }) {
      state.list.push(layer);
    },
    setCurrentLayer(state, { key }) {
      state.currentLayer = key;
    },
    setLayer(state, { key, layer }) {
      state.list[key] = layer;
    },
    setData(state, { key, data }) {
      state.list[key].data = data;
    },
    setProperties(state, { key, props }) {
      Object.assign(state.list[key].props, props);
    },
    setMember(state, { key, name, value }) {
      state.list[key][name] = value;
    },
    deleteLayer(state, { key }) {
      state.list.splice(key, 1);
      state.currentLayer = null;
    }
  }
};
