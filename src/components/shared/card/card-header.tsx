import React, { FunctionComponent, ReactElement } from 'react';

import './card.scss';

export const CardHeader: FunctionComponent = ({ children }): ReactElement => {
  return <div className="c-card__header">{children}</div>;
};
