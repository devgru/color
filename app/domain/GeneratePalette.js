import d3 from 'd3';
import deltae from 'deltae';
import d3c from 'd3-color';

function hex(v) {
  return v < 0x10 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
}

function toString(color) {
  var rgb = d3c.rgb(String(color));
  return '#' + hex(rgb.r) + hex(rgb.g) + hex(rgb.b);
}

function GeneratePalette (state) {
  var startHue = parseFloat(state.startHue);
  var minDelta = parseFloat(state.minDelta);
  var maxL = parseFloat(state.maxL);
  var minL = parseFloat(state.minL);
  var minC = parseFloat(state.minC);
  var maxC = parseFloat(state.maxC);
  var lcPrecision = parseFloat(state.lcPrecision);
  var hPrecision = parseFloat(state.hPrecision);

  function hueColor(h) {
    var results = [];
    d3.range(minL, maxL, lcPrecision).forEach(function (l) {
      d3.range(maxC, minC, -lcPrecision).forEach(function (c) {
        var color = d3c.hcl(h, c, l);
        if (color.displayable()) {
          results.push(color);
        }
      });
    });
    results.sort(function (a, b) {
      return -(a.c - b.c + (a.l - b.l) / 1000);
    });
    return results[0];
  }

  var prevColor;
  var hue = startHue;
  var colors = [];

  while (hue < 360 + startHue) {
    var delta;
    var color;
    if (prevColor) {
      hue += hPrecision;
      color = hueColor(hue);
      if (!color) {
        console.warn('color for hue', hue, 'not found, stopping');
        return;
      }
      deltae.delta(toString(color), toString(prevColor), function (d) {
        delta = d;
      });
      if (delta < minDelta) {
        continue
      }
    } else {
      color = hueColor((hue));
      if (!color) {
        console.warn('color for hue', hue, 'not found, stopping');
        return;
      }
    }

    colors.push(color);
    prevColor = color;
  }


  deltae.delta(toString(colors[0]), toString((colors[colors.length - 1])), function (d) {
    if (d < minDelta) colors.pop()
  });

  location.hash = colors.map(toString).join('/');
}

export default GeneratePalette;
