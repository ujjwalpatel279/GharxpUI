import { Icon } from '../../shared';
import React, { FunctionComponent, ReactElement } from 'react';
import { CardHeader } from '../../shared/card/card-header';

import './card-error-handling.scss';

export const CardErrorHandlingHeader: FunctionComponent = (): ReactElement => {
  return (
    <CardHeader>
      <header className="c-card-bad-redirects__header">
        <div className="c-card-bad-redirects__header__top">
          <div className="c-card__header__avatar">
            <div className="c-card__header__avatar__image">
              <Icon name="applicants" />
            </div>
          </div>
        </div>
      </header>
    </CardHeader>
  );
};
