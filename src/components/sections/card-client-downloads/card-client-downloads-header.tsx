import React from 'react';
import { CardHeader } from '../../shared/card/card-header';

import './card-clients.scss';

export const CardClientDownloadsHeader = (): JSX.Element => {
  return (
    <CardHeader>
      <header className="c-card__header">
        <div className="c-card__header__top">
          <div className="c-card__header__applicant">
            <h3>Documents</h3>
          </div>
        </div>
      </header>
    </CardHeader>
  );
};
