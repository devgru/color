import { rgb } from 'd3-color';

function hex(v) {
  return v < 0x10 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
}

function toString(color) {
  var rgbColor = rgb(String(color));
  return '#' + hex(rgbColor.r) + hex(rgbColor.g) + hex(rgbColor.b);
}

export default toString;
