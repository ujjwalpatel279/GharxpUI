import React, { FunctionComponent, ReactElement } from 'react';
import NoApplicants from '../../../images/no-applicants.svg';
import NoClients from '../../../images/no-clients.svg';

import './no-grid-data.scss';

interface NoGridDataProps {
  image: 'no-clients' | 'no-applicants';
  message: string;
}

export const NoGridData: FunctionComponent<NoGridDataProps> = ({ image, message }): ReactElement => {
  let imageSrc = NoApplicants;
  switch (image) {
    case 'no-clients':
      imageSrc = NoClients;
  }
  return (
    <div className="c-grid-no-data">
      <img src={imageSrc} className="c-grid-no-data__image" alt="no-data"></img>
      <div className="c-grid-no-data__message">{message} </div>
    </div>
  );
};
