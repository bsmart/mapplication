import { GeoJsonLayer } from "@/components/layers/model";

const ConstructorMap = {
  GeoJsonLayer
};

export default function LayerFactory(type) {
  return new ConstructorMap[type]();
}
