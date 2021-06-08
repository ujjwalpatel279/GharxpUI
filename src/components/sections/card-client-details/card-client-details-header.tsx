import React, { FunctionComponent } from 'react';
import { AddressInterface } from '../../../shared/models';
import { Icon } from '../../shared';
import { CardHeader } from '../../shared/card/card-header';

import './card-clients.scss';

export interface CardClientDetailsProps {
  firstName: string;
  surname: string;
  address: AddressInterface;
}

export const CardClientDetailsHeader: FunctionComponent<CardClientDetailsProps> = ({
  firstName,
  surname,
  address,
}): JSX.Element => {
  return (
    <CardHeader>
      <header className="c-card__header">
        <div className="c-card__header__top">
          <div className="c-card__header__avatar">
            <div className="c-card__header__avatar__image">
              <span>{`${firstName.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`}</span>
            </div>
          </div>
          <div className="c-card__header__applicant">
            <p>Applicant</p>
            <h3>{`${firstName} ${surname}`}</h3>
          </div>
        </div>
        <div className="c-card__address">
          <div className="c-card__address__icon">
            <Icon name="house" size="large" colour="secondary" />
          </div>
          <div className="c-card__address__text">
            {address &&
              `${address.propertyNumber || address.propertyName}, ${address.road}, ${address.town},
              ${address.county}, ${address.postCode}`}
          </div>
        </div>
      </header>
    </CardHeader>
  );
};
