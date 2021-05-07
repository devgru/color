import React from 'react';
import ColorCard from './ColorCard';
import Delta from './Delta';

function ColorApp({ colors }) {
  if (colors.length === 0) {
    return null;
  }

  const lastColor = colors[colors.length - 1];

  const pairs = colors.map((c, i) => [c, colors[i + 1]]);
  pairs.length--;

  return (
    <div>
      {pairs.map(pair => {
        return [
          <ColorCard key={pair[0]} color={pair[0]} />,
          <Delta key={pair} colors={pair} />,
        ];
      })}
      <ColorCard key={lastColor} color={lastColor} />
    </div>
  );
}

export default ColorApp;
