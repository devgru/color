import React from 'react';
import ColorCard from './ColorCard';
import PaletteGenerator from './PaletteGenerator';
import GeneratePalette from '../domain/GeneratePalette';

function ColorApp(props) {
  const colors = props.colors;
  return (
    <div>
      <PaletteGenerator />
      {colors.map(c => <ColorCard key={c} color={c}/>)}
    </div>
  )
}
export default ColorApp;

