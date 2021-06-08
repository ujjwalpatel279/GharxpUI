import React, { FunctionComponent, ReactElement } from 'react';

import './card.scss';

export const Card: FunctionComponent = ({ children }): ReactElement => {
  const cardClasses = 'c-card u-mb-3';
  return <div className={cardClasses}>{children}</div>;
};
