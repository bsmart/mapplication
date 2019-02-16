import mapboxgl from "mapbox-gl";

export default {
  namespaced: true,
  state: {
    map: null,
    accessToken: "",
    style: "mapbox://styles/mapbox/bright-v9",
    center: [-122.6587, 45.5122],
    zoom: 10,
    bearing: 0,
    pitch: 0
  },
  getters: {},
  actions: {
    createMap({ commit, state }, element) {
      commit("setMap", {
        map: new mapboxgl.Map({
          container: element,
          style: state.style,
          center: state.center,
          zoom: state.zoom,
          bearing: state.bearing,
          pitch: state.pitch
        })
      });
    },
    destroyMap({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit("destroyMap");
          resolve();
        } catch (error) {
          reject();
        }
      });
    },
    setAccessToken({ commit }, accessToken) {
      commit("setAccessToken", { accessToken });
    },
    setStyle({ commit }, style) {
      commit("setStyle", { style });
    },
    setCenter({ commit }, center) {
      if (
        center[0] >= -180 &&
        center[0] <= 180 &&
        center[1] >= -90 &&
        center[1] <= 90
      ) {
        commit("setCenter", { center });
      }
    },
    setZoom({ commit }, zoom) {
      commit("setZoom", { zoom });
    },
    setBearing({ commit }, bearing) {
      commit("setBearing", { bearing });
    },
    setPitch({ commit }, pitch) {
      commit("setPitch", { pitch });
    },
    jump({ commit }, state) {
      commit("setViewState", { viewState: state });
    }
  },
  mutations: {
    setAccessToken(state, { accessToken }) {
      mapboxgl.accessToken = accessToken;
      state.accessToken = accessToken;
    },
    setStyle(state, { style }) {
      state.style = style;
    },
    setCenter(state, { center }) {
      state.center = center;
    },
    setZoom(state, { zoom }) {
      state.zoom = zoom;
    },
    setBearing(state, { bearing }) {
      state.bearing = bearing;
    },
    setPitch(state, { pitch }) {
      state.pitch = pitch;
    },
    setMap(state, { map }) {
      state.map = map;
    },
    destroyMap(state) {
      state.map.remove();
      state.map = null;
    },
    setViewState(state, { viewState }) {
      state.map.jumpTo(viewState);
    }
  }
};
