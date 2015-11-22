import React from 'react';
import {render} from 'react-dom';
import ColorApp from './components/ColorApp'

var mountNode = document.getElementById('react-main-mount');

function renderApp() {
  var hash = location.hash;
  var upper = hash.toUpperCase();
  if(hash == upper)
    render(<ColorApp colors={ hash.split('/')}/>, mountNode);
  else
    location.hash = upper;
}

renderApp();
window.addEventListener('hashchange', renderApp, false);
