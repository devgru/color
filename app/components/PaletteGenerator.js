import React from 'react';
import GeneratePalette from '../domain/GeneratePalette'

var PaletteGenerator = React.createClass({
  getInitialState: function () {
    return {
      startHue: 25,
      minDelta: 18,
      maxL: 90,
      minL: 25,
      maxC: 65,
      minC: 35,
      lcPrecision: 0.5,
      hPrecision: 1
    };
  },

  generate: function () {
    GeneratePalette(this.state);
  },

  startHue: function (event) { this.setState({startHue: event.target.value}); },
  minDelta: function (event) { this.setState({minDelta: event.target.value}); },
  maxL: function (event) { this.setState({maxL: event.target.value}); },
  minL: function (event) { this.setState({minL: event.target.value}); },
  maxC: function (event) { this.setState({maxC: event.target.value}); },
  minC: function (event) { this.setState({minC: event.target.value}); },
  lcPrecision: function (event) { this.setState({lcPrecision: event.target.value}); },
  hPrecision: function (event) { this.setState({hPrecision: event.target.value}); },

  render: function () {
    return (
      <div className="color-card">
        <div className="color-card__generate">
          <h3>Generate palette</h3>
          <p><label>Start hue: <input value={this.state.startHue} onChange={this.startHue} /></label></p>
          <p><label>H precision: <input value={this.state.hPrecision} onChange={this.hPrecision} /></label></p>
          <p><label>L/C precision: <input value={this.state.lcPrecision} onChange={this.lcPrecision} /></label></p>
          <p><label>Min deltaE: <input value={this.state.minDelta} onChange={this.minDelta} /></label></p>
          <p><label>Min L: <input value={this.state.minL} onChange={this.minL} /></label></p>
          <p><label>Max L: <input value={this.state.maxL} onChange={this.maxL} /></label></p>
          <p><label>Min C: <input value={this.state.minC} onChange={this.minC} /></label></p>
          <p><label>Max C: <input value={this.state.maxC} onChange={this.maxC} /></label></p>
          <p><button onClick={this.generate}>Generate</button></p>
        </div>
      </div>
    );
  }
});

export default PaletteGenerator;
