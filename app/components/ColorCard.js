import React from 'react';
import d3 from 'd3-color';
import round from 'round-to-precision';
import objectMap from 'object-map';
import classNames from 'classnames';
import { hexToRgba } from 'hex-and-rgba'
import ClosestColor from '../domain/ClosestColor'
const cents = round(0.01);

const RED_HUE = 20;
const BLUE_HUE = 306.28;

function lightness(color) {
  const L = color.l;

  return L < 2 ? 'black'
    : L < 5 ? 'almost black'
    : L < 35 ? 'dark'
    : L > 98 ? 'white'
    : L > 95 ? 'almost white'
    : L > 65 ? 'bright'
    : undefined;
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

function ColorCard(props) {
  const color = props.color;
  const cardStyle = {
    backgroundColor: color
  };

  const hcl = d3.hcl(color);

  const colorName = ClosestColor(hcl.toString()).name;

  const prettyColor = objectMap(hcl, cents);
  if (prettyColor.c == 0) prettyColor.h = 'any';

  const textClasses = classNames({
    'color-card__text': true,
    'color-card__text_bright': hcl.l > 50,
    'color-card__text_dark': hcl.l <= 50
  });

  const description = properties.map(propertyOf(prettyColor)).filter(Boolean).join(', ');

  return (
    <div className="color-card" style={cardStyle}>
      <div className={textClasses}>
        <div className="color-card__hex">
          {color} — {colorName}
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

export default ColorCard;
