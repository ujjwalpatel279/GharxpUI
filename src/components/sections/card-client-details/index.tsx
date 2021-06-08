import React, { FunctionComponent, MouseEvent, ReactElement, useState } from 'react';
import { CustomerDetailInterface } from '../../../shared/models';
import { Card } from '../../shared';
import { CardClientDetailsFooter } from './card-client-details-footer';
import { CardClientDetailsBody } from './card-client-details-body';
import { CardClientDetailsHeader } from './card-client-details-header';

import './card-clients.scss';
import { CaseDetail } from '../case-dashboard/caseDetail.model';

interface CardClientsProps {
  cases: CaseDetail[];
  client: CustomerDetailInterface;
  handleExpand?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const CardClientDetails: FunctionComponent<CardClientsProps> = ({ client, cases }): ReactElement => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleExpand: (e: MouseEvent<HTMLButtonElement>) => void = () => {
    setExpanded(!expanded);
  };
  return (
    <Card>
      <CardClientDetailsHeader firstName={client.firstName} surname={client.surname} address={client.address} />
      <CardClientDetailsBody cases={!expanded ? cases.slice(0, 3) : cases} />
      <CardClientDetailsFooter expanded={expanded} handleExpand={handleExpand} />
    </Card>
  );
};
