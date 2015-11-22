import React from 'react';
import ColorCard from './ColorCard'

class ColorApp extends React.Component {
  render() {
    return (
      <div>{this.props.colors.map(c => <ColorCard color={c} />)}</div>
    )
  }
}
export default ColorApp;

