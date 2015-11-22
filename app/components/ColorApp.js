import React from 'react';
import ColorCard from './ColorCard'

class ColorApp extends React.Component {
  render() {
    const colors = this.props.colors;
    return (
      <div>
        {colors.map(c => <ColorCard key={c} color={c}/>)}
      </div>
    )
  }
}
export default ColorApp;

