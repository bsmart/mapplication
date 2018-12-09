import mapboxgl from "mapbox-gl";

export default {
  namespaced: true,
  state: {
    map: {},
    accessToken: "",
    style: "mapbox://styles/mapbox/bright-v9",
    center: [-122.6587, 45.5122],
    zoom: 10
  },
  getters: {
    createMap: state => element => {
      return new mapboxgl.Map({
        container: element,
        style: state.style,
        center: state.center,
        zoom: state.zoom
      });
    }
  },
  actions: {
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
    }
  }
};
