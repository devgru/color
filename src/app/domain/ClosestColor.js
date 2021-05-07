import nearestColor from 'nearest-color';
import namedColors from 'color-name-list';

// nearestColor need objects {name => hex} as input
const colors = namedColors.reduce(
  (hash, { name, hex }) => Object.assign(hash, { [name]: hex }),
  {},
);

const nearest = nearestColor.from(colors);

export default (color) => nearest(color);
