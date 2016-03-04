import React from 'react';
import {render} from 'react-dom';
import ColorApp from './components/ColorApp'
import {validate} from './components/ColorHash'
import uniq from 'lodash/array/uniq';

var mountNode = document.getElementById('react-main-mount');

function renderApp() {
  var hash = location.hash;
  var upper = hash.toUpperCase();
  var colors = uniq(upper.split('/').filter(Boolean));
  var properUrl = colors.join('/');

  if (validate(hash) || colors.length == 0)
    render(<ColorApp colors={ colors }/>, mountNode);
  else
    location.hash = properUrl;
}

window.addEventListener('hashchange', renderApp, false);
renderApp();
