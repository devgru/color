import nearestColor from 'nearest-color';
import namedColors from 'color-name-list';

// nearestColor need objects {name => hex} as input
const colors = namedColors.reduce(
  (o, { name, hex }) => Object.assign(o, { [name]: hex }),
  {},
);

const nearest = nearestColor.from(colors);

function ClosestColor(c) {
  return nearest(c);
}

export default ClosestColor;
