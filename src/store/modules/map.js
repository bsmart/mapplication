export default {
  namespaced: true,
  state: {
    accessToken: ""
  },
  getters: {},
  actions: {
    setAccessToken({ commit }, accessToken) {
      commit("setAccessToken", { accessToken });
    }
  },
  mutations: {
    setAccessToken(state, { accessToken }) {
      state.accessToken = accessToken;
    }
  }
};
