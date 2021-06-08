import React, { FunctionComponent, ReactElement } from 'react';

import './card.scss';

export const CardBody: FunctionComponent = ({ children }): ReactElement => {
  return <div className="c-card__body">{children}</div>;
};
