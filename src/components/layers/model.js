import uuid from "@/utilities/uuid";
import * as turf from "@turf/turf";

// eslint-disable-next-line
import {
  ArcLayer as DeckArcLayer,
  ContourLayer as DeckContourLayer,
  GeoJsonLayer as DeckGeoJsonLayer,
  GridLayer as DeckGridLayer,
  GridCellLayer as DeckGridCellLayer,
  HexagonLayer as DeckHexagonLayer,
  HexagonCellLayer as DeckHexagonCellLayer,
  IconLayer as DeckIconLayer,
  LineLayer as DeckLineLayer,
  PathLayer as DeckPathLayer,
  PointCloudLayer as DeckPointCloudLayer,
  PolygonLayer as DeckPolygonLayer,
  ScatterplotLayer as DeckScatterplotLayer,
  ScreenGridLayer as DeckScreenGridLayer,
  TextLayer as DeckTextLayer
} from "@deck.gl/layers";

const ConstructorMap = {
  ArcLayer: DeckArcLayer,
  ContourLayer: DeckContourLayer,
  GeoJsonLayer: DeckGeoJsonLayer,
  GridLayer: DeckGridLayer,
  GridCellLayer: DeckGridCellLayer,
  HexagonLayer: DeckHexagonLayer,
  HexagonCellLayer: DeckHexagonCellLayer,
  IconLayer: DeckIconLayer,
  LineLayer: DeckLineLayer,
  PathLayer: DeckPathLayer,
  PointCloudLayer: DeckPointCloudLayer,
  PolygonLayer: DeckPolygonLayer,
  ScatterplotLayer: DeckScatterplotLayer,
  ScreenGridLayer: DeckScreenGridLayer,
  TextLayer: DeckTextLayer
};

class Layer {
  id = "";
  name = "";
  type = "Layer";
  props = {};
  mapFunction = "return value;";

  constructor(type) {
    this.id = uuid.generate();
    this.name = "New layer";
    this.type = type;
    this.props = {};
    this.mapFunction = "return value;";
    this.preFunction = "";
  }

  toDeckLayer(props = {}) {
    let p = Object.assign({}, this.props, props);
    return new ConstructorMap[this.type](p);
  }
}

class GeoJsonLayer extends Layer {
  constructor() {
    super("GeoJsonLayer");

    // copy of the default properties
    this.props = Object.assign({}, DeckGeoJsonLayer.defaultProps);
    this.props.id = this.id;
    this.props.opacity = 0.5;
    // stringify default functions
    this.props.getLineColor = `return ${JSON.stringify(
      this.props.getLineColor.value
    )};`;
    this.props.getFillColor = `return ${JSON.stringify(
      this.props.getFillColor.value
    )};`;
    this.props.getRadius = `return ${JSON.stringify(
      this.props.getRadius.value
    )};`;
    this.props.getLineWidth = `return ${JSON.stringify(
      this.props.getLineWidth.value
    )};`;
    this.props.getElevation = `return ${JSON.stringify(
      this.props.getElevation.value
    )};`;
    this.props.getLineDashArray = `return ${JSON.stringify(
      this.props.getLineDashArray.value
    )};`;
  }

  toDeckLayer() {
    let props = {
      data: turf.featureCollection(this.props.data),
      // assign the functions
      getLineColor: new Function("data", this.props.getLineColor),
      getFillColor: new Function("data", this.props.getFillColor),
      getRadius: new Function("data", this.props.getRadius),
      getLineWidth: new Function("data", this.props.getLineWidth),
      getElevation: new Function("data", this.props.getElevation),
      getLineDashArray: new Function("data", this.props.getLineDashArray)
    };
    return super.toDeckLayer(props);
  }
}

export { Layer, GeoJsonLayer };
