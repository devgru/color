import React from 'react';
import { hcl, rgb } from 'd3-color';
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

  return L < 5 ? 'very dark'
    : L < 35 ? 'dark'
    : L > 95 ? 'very bright'
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

  const hclColor = hcl(color);
  const rgbColor = rgb(color);

  const colorName = ClosestColor(hclColor.hex()).name;

  const prettyHcl = objectMap(hclColor, cents);
  const prettyRgb = objectMap(rgbColor, cents);
  if (prettyHcl.c == 0) prettyHcl.h = 'any';

  const textClasses = classNames({
    'color-card__text': true,
    'color-card__text_bright': hclColor.l > 50,
    'color-card__text_dark': hclColor.l <= 50
  });

  const description = properties.map(propertyOf(prettyHcl)).filter(Boolean).join(', ');

  return (
    <div className="color-card" style={cardStyle}>
      <div className={textClasses}>
        <div>
          <span className="color-card__hex">{color}</span>
          <span className="color-card__name"> — {colorName}</span>
        </div>
        <div className="color-card__description">
          {description}
        </div>
        <div className="color-card__properties">
          R: {prettyRgb.r}, G: {prettyRgb.g}, B: {prettyRgb.b}
        </div>
        <div className="color-card__properties">
          H: {prettyHcl.h}, C: {prettyHcl.c}, L: {prettyHcl.l}
        </div>
      </div>
    </div>
  );
}

export default ColorCard;
