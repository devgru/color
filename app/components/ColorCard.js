import React from 'react';
import d3 from 'd3-color';
import round from 'round-to-precision';
import objectMap from 'object-map';

const cents = round(0.01);

const RED_HUE = 20;
const BLUE_HUE = 306.28;

function lightness(color) {
  const L = color.l;

  return L < 35 ? 'dark' : L > 65 ? 'bright' : undefined;
}

function chromatic(color) {
  const C = color.c;

  return C == 0 ? 'achromatic' : C < 10 ? 'almost achromatic' : 'chromatic';
}

function temperature(color) {
  const H = color.h;
  const C = color.c;

  return C == 0 || H < RED_HUE || H > BLUE_HUE ? undefined : H < 143.95 ? 'warm' : 'cold';
}

function propertyOf(color) {
  return property => property(color)
}

class ColorCard extends React.Component {
  componentDidMount() {
  }
  render() {
    const style = {
      width: '100px',
      height: '100px',
      backgroundColor: this.props.color
    };

    const color = d3.hcl(this.props.color);
    const prettyColor = objectMap(color, cents);

    const properties = [
      lightness,
      chromatic,
      temperature
    ];

    const text = properties.map(propertyOf(prettyColor)).filter(Boolean).join(', ');

    return <div style={style}>{text} H: {prettyColor.h}, C: {prettyColor.c}, L: {prettyColor.l}</div>
  }
}

export default ColorCard;
