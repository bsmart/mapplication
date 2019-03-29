import uuid from "@/utilities/uuid";

export default class Source {
  id = "";
  name = "";
  data = {};
  mapFunction = "return value;";
  reduceFunction = "return acc;";

  constructor() {
    this.id = uuid.generate();
    this.name = "New source";
    this.data = [];
    this.mapFunction = "return value;";
    this.reduceFunction = "return acc;";
  }
}
