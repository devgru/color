import d3 from 'd3-color';

function hex(v) {
  return v < 0x10 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
}

function toString(color) {
  var rgb = d3.rgb(String(color));
  return '#' + hex(rgb.r) + hex(rgb.g) + hex(rgb.b);
}

export default toString;
