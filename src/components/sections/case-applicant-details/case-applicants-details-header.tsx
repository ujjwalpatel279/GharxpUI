import React, { FunctionComponent } from 'react';
import { Icon } from '../../shared';
import { CardHeader } from '../../shared/card/card-header';

import './case-applicants.scss';

export interface CaseApplicantsDetailsProps {
  firstName: string;
  surname: string;
  isMainApplicant?: boolean;
  email?: string;
  mobileNumber?: string;
}

export const CaseApplicantsDetailsHeader: FunctionComponent<CaseApplicantsDetailsProps> = ({
  firstName,
  surname,
  isMainApplicant,
  email,
  mobileNumber,
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
            <p>{isMainApplicant ? `Main Applicant` : `Applicant`}</p>
            <h3>{`${firstName} ${surname}`}</h3>
          </div>
        </div>
        {email && (
          <div className="c-card__address-contact">
            <div className="c-card__address-contact__icon">
              <Icon name="email" size="small" colour="secondary" />
            </div>
            <div className="c-card__address-contact__text">
              <a href={'mailto:' + email}>{email}</a>
            </div>
          </div>
        )}
        {mobileNumber && (
          <div className="c-card__address-contact">
            <div className="c-card__address-contact__icon">
              <Icon name="phone" size="small" colour="secondary" />
            </div>
            <div className="c-card__address-contact__text">{mobileNumber}</div>
          </div>
        )}
      </header>
    </CardHeader>
  );
};
