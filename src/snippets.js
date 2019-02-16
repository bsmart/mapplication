function a() {
  var color = d3
    .scaleOrdinal()
    .domain([...new Set(array.map(item => item.properties.Type))])
    .range(d3.schemeSet1);
  var c = d3.rgb(color(value.properties.Type));
  value.properties.color = [c.r, c.g, c.b];
  return value;
}

function b() {
  var colorRange = d3.quantize(
    d3.interpolateRgb(colors["marine-lightest"], colors["marine-darkest"]),
    array.length
  );
  var color = d3
    .scaleOrdinal()
    .domain([...new Set(array.map(item => item.properties.CITYNAME))])
    .range(colorRange);
  var c = d3.rgb(color(value.properties.CITYNAME));
  value.properties.color = [c.r, c.g, c.b];
  return value;
}

function c() {
  var s = [...new Set(array.map(item => item.properties.CITYNAME))];
  var r = d3.quantize(d3.interpolateSpectral, s.length);
  var color = d3
    .scaleOrdinal()
    .domain(s)
    .range(r);
  var c = d3.rgb(color(value.properties.CITYNAME));
  value.properties.color = [c.r, c.g, c.b];
  return value;
}

var colorRange = d3.quantize(d3.interpolatePuOr, array.length);
var color = d3
  .scaleOrdinal()
  .domain([...new Set(array.map(item => item.properties.CITYNAME))])
  .range(colorRange);
var c = d3.rgb(color(value.properties.CITYNAME));
value.properties.color = [c.r, c.g, c.b];
return value;

var z = d3
  .scaleLog()
  .domain(d3.extent(array, d => d.properties.AREA))
  .range([0, 5000]);

  .range(["brown", "steelblue"])
  .interpolate(d3.interpolateCubehelix.gamma(3));
value.properties.z = z(value.properties.AREA);
return value;
