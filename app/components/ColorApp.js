import React from 'react';
import ColorCard from './ColorCard';
import Delta from './Delta';

function ColorApp(props) {
  const colors = props.colors;
  const colors1 = colors.slice();
  const colors2 = colors.slice();
  const lastColor = colors1.pop();
  colors2.shift();

  const pairs = colors1.map((color, i) => [color, colors2[i]]);

  console.log(colors, colors1, colors2, pairs);
  const results = [];
  pairs.forEach(pair => {
    const color = pair[0];
    results.push(<ColorCard key={color} color={color} />);
    results.push(<Delta key={pair} colors={pair} />);
  });
  return (
    <div>
      {results}
      <ColorCard key={lastColor} color={lastColor} />
    </div>
  )
}
export default ColorApp;

