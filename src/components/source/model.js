import uuid from "@/utilities/uuid";

export default class Source {
  id = "";
  name = "";
  data = {};
  maxzoom = 18;
  attribution = "";
  buffer = 128;
  tolerance = 0.375;
  cluster = false;
  clusterRadius = 50;
  clusterMaxZoom = this.maxzoom - 1;
  lineMetrics = false;
  generateId = false;

  constructor() {
    this.id = uuid.generate();
    this.name = "new-source";
    this.data = null;
    this.maxzoom = 18;
    this.attribution = "";
    this.buffer = 128;
    this.tolerance = 0.375;
    this.cluster = false;
    this.clusterRadius = 50;
    this.clusterMaxZoom = this.maxzoom - 1;
    this.lineMetrics = false;
    this.generateId = false;
  }

  addToMap(map) {
    map.addSource(this.name, {
      data: this.data,
      maxzoom: this.maxzoom,
      attribution: this.attribution,
      buffer: this.buffer,
      tolerance: this.tolerance,
      cluster: this.cluster,
      clusterRadius: this.clusterRadius,
      clusterMaxZoom: this.clusterMaxZoom,
      lineMetrics: this.lineMetrics,
      generateId: this.generateId
    });
  }
}
