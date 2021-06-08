import React, { FunctionComponent, ReactElement } from 'react';

import './card.scss';

interface footerInterface {
  childClasses?: string;
}

export const CardFooter: FunctionComponent<footerInterface> = ({ children, childClasses }): ReactElement => {
  return <div className={`c-card__footer ${childClasses ?? ''}`}>{children}</div>;
};
