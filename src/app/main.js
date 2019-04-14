import React from 'react';
import { render } from 'react-dom';
import ColorApp from './components/ColorApp';
import { validate } from './components/ColorHash';
import uniq from 'lodash.uniq';

const mountNode = document.getElementById('root');

const fix = cs => cs.replace(/%23/g, '#');

function renderApp() {
  const hash = window.location.hash;
  const upper = hash.toUpperCase();
  const colors = uniq(upper.split('/').filter(Boolean));
  const properUrl = fix(colors.join('/'));

  if (validate(hash) || colors.length === 0)
    render(<ColorApp colors={colors} />, mountNode);
  else window.location.hash = properUrl;
}

window.addEventListener('hashchange', renderApp, false);
renderApp();
