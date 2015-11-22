import React from 'react';
import d3 from 'd3-color';
import round from 'round-to-precision';
import objectMap from 'object-map';
import classNames from 'classnames';
import { hexToRgba } from 'hex-and-rgba'

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

const properties = [
  lightness,
  chromatic,
  temperature
];

class ColorCard extends React.Component {
  render() {
    const color = this.props.color;
    const cardStyle = {
      backgroundColor: color
    };

    const hcl = d3.hcl(color);

    const textColor = d3.hcl(color);
    textColor.l += 25 * (hcl.l > 50 ? -1 : 1);
    const textStyle = {
      color: `rgba(${hexToRgba(textColor + '80')})`,
      backgroundColor: `rgba(${hexToRgba(textColor + '40')})`
    };

    const prettyColor = objectMap(hcl, cents);
    if (prettyColor.c == 0) prettyColor.h = 'any';

    const textClasses = classNames({
      'color-card__text': true,
      'color-card__text_light': hcl.l > 50,
      'color-card__text_dark': hcl.l <= 50
    });

    const description = properties.map(propertyOf(prettyColor)).filter(Boolean).join(', ');

    return (
      <div className="color-card" style={cardStyle}>
        <div className={textClasses} style={textStyle}>
          <div className="color-card__hex">
            {color}
          </div>
          <div className="color-card__description">
            {description}
          </div>
          <div className="color-card__properties">
            H: {prettyColor.h}, C: {prettyColor.c}, L: {prettyColor.l}
          </div>
        </div>
      </div>
    );
  }
}

export default ColorCard;
