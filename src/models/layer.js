export default class Layer {
  id = 1;
  name = "";
  geoJson = {};
  fill = "";
  stroke = "";

  constructor(id) {
    this.id = id;
    this.name = "New layer";
  }
}
