import React from 'react';
import {render} from 'react-dom';
import ColorApp from './components/ColorApp'

var mountNode = document.getElementById('react-main-mount');

//render(new ColorCard({color: '#' + location.pathname.slice(1)}), mountNode);
function renderApp() {
  render(<ColorApp colors={ location.hash.split('/')}/>, mountNode);
}

renderApp();
window.addEventListener('hashchange', renderApp, false);
