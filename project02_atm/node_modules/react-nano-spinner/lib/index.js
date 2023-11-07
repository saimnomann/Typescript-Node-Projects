import React from 'react';

import css from './index.scss';

const ReactNanoSpinner = ({ className, style }) => (
  <div className={`nano-spinner-bounce ${css['nano-spinner-bounce']} ${className || ''}`.trim()} style={style}>
    <div className={css['bounce1']} />
    <div className={css['bounce2']} />
    <div className={css['bounce3']} />
  </div>
);

export default ReactNanoSpinner;
