import React from 'react';
import ColorCard from './ColorCard';

function ColorApp(props) {
  const colors = props.colors;
  return (
    <div>
      {colors.map(c => <ColorCard key={c} color={c}/>)}
    </div>
  )
}
export default ColorApp;

