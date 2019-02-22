<template>
  <canvas id="deck" class="pin z-10 h-full"></canvas>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { Deck } from "@deck.gl/core";

export default {
  name: "Deck",
  mounted() {
    var initialViewState = {
      latitude: this.center[1],
      longitude: this.center[0],
      zoom: this.zoom,
      bearing: this.bearing,
      pitch: this.pitch
    };

    let layers = this.layers;
    let deckLayers = [];

    for (const layer of layers) {
      deckLayers.push(layer.toDeckLayer());
    }

    this.deck = new Deck({
      canvas: this.$el,
      width: "100%",
      height: "100%",
      initialViewState,
      layers: deckLayers,
      controller: true,
      onViewStateChange: ({ viewState }) => {
        this.jump({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch
        });
      }
    });
  },
  beforeDestroy() {
    this.deck.finalize();
  },
  data() {
    return {
      deck: {}
    };
  },
  computed: {
    ...mapGetters("layers", ["layers"]),
    ...mapState({
      map: state => state.map.map,
      center: state => state.map.center,
      zoom: state => state.map.zoom,
      bearing: state => state.map.bearing,
      pitch: state => state.map.pitch
    })
  },
  methods: {
    ...mapActions("map", ["jump"])
  }
};
</script>

<style>
</style>
