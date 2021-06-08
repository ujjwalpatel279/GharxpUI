import React, { FunctionComponent, ReactElement } from 'react';
import { CardBody } from '../../shared/card/card-body';

import './card-error-handling.scss';

export const CardErrorHandlingBody: FunctionComponent = (): ReactElement => {
  return (
    <CardBody>
      <div className="s-card-bad-redirects__detail">
        <div className="s-card-bad-redirects__detail__content">
          <b>Something went wrong !</b>
        </div>
      </div>
      <div className="s-card-bad-redirects__detail">
        <div className="c-cart__detail__content">
          <p>something went wrong and we couldn&apos;t complete your request. please refresh the page to try again</p>{' '}
        </div>
      </div>
    </CardBody>
  );
};
