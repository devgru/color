import React from 'react';
import { hcl } from 'd3-color';
import deltae from 'deltae';
import toString from '../domain/ColorToString';
import classNames from 'classnames';

import round from 'round-to-precision';
const cents = round(0.01);

function Delta(props) {
  var delta = 0;
  var hcl1 = hcl(props.colors[0]);
  var hcl2 = hcl(props.colors[1]);

  deltae.delta(toString(hcl1), toString(hcl2), function (d) {
    delta = cents(d);
  });

  const textClasses = classNames({
    'delta': true,
    'color-card__text_bright': hcl1.l + hcl2.l > 100,
    'color-card__text_dark': hcl1.l + hcl2.l <= 100
  });

  const style = {
    background: '-webkit-linear-gradient(left, ' + hcl1 + ' 0%, ' + hcl2 + ' 100%)'
  };

  return <div style={style} className={textClasses}>
    <span>{delta}</span>
  </div>;
}

export default Delta;
