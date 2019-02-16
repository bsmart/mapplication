import { Deck } from "@deck.gl/core";

export default {
  namespaced: true,
  state: {
    deck: null
  },
  getters: {},
  actions: {
    createDeck({ commit, dispatch, rootState }, element) {
      var initialViewState = {
        latitude: rootState.map.center[1],
        longitude: rootState.map.center[0],
        zoom: rootState.map.zoom,
        bearing: rootState.map.bearing,
        pitch: rootState.map.pitch
      };

      let layers = rootState.layers.list;
      let deckLayers = [];

      for (const layer of layers) {
        deckLayers.push(layer.toDeckLayer());
      }

      commit("setDeck", {
        deck: new Deck({
          canvas: element,
          width: "100%",
          height: "100%",
          initialViewState,
          layers: deckLayers,
          controller: true,
          onViewStateChange: ({ viewState }) => {
            dispatch(
              "map/jump",
              {
                center: [viewState.longitude, viewState.latitude],
                zoom: viewState.zoom,
                bearing: viewState.bearing,
                pitch: viewState.pitch
              },
              { root: true }
            );
          }
        })
      });
    }
  },
  mutations: {
    setDeck(state, { deck }) {
      state.deck = deck;
    }
  }
};
