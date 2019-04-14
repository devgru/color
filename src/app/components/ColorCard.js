import React from 'react';
import { hcl, rgb } from 'd3-color';
import round from 'round-to-precision';
import objectMap from 'object-map';
import classNames from 'classnames';
import ClosestColor from '../domain/ClosestColor';
import ColorDescriptor from 'color-descriptor';

const cents = round(0.01);

const descriptor = new ColorDescriptor();

function ColorCard(props) {
  const color = props.color;
  const cardStyle = {
    backgroundColor: color,
  };

  const hclColor = hcl(color);
  const rgbColor = rgb(color);

  const colorName = ClosestColor(hclColor.hex()).name;

  const prettyHcl = objectMap(hclColor, cents);
  const prettyRgb = objectMap(rgbColor, cents);
  if (prettyHcl.c === 0) prettyHcl.h = 'any';

  const textClasses = classNames({
    'color-card__text': true,
    'color-card__text_bright': hclColor.l > 50,
    'color-card__text_dark': hclColor.l <= 50,
  });

  const description = descriptor.describe(color).join(', ');
  return (
    <div className="color-card" style={cardStyle}>
      <div className={textClasses}>
        <div>
          <span className="color-card__hex">{color}</span>
          <span className="color-card__name"> — {colorName}</span>
        </div>
        <div className="color-card__description">{description}</div>
        <div className="color-card__properties">
          rgb({prettyRgb.r}, {prettyRgb.g}, {prettyRgb.b})
        </div>
        <div className="color-card__properties">
          hcl({prettyHcl.h}, {prettyHcl.c}, {prettyHcl.l})
        </div>
      </div>
    </div>
  );
}

export default ColorCard;
