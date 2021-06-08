import React, { FunctionComponent, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Pill } from '../../shared';
import { CardBody } from '../../shared/card/card-body';

import './card-clients.scss';
import { CaseDetail } from '../case-dashboard/caseDetail.model';
import { ApplicationStatus } from '../../../shared/types/enums';

interface CardBodyProps {
  cases: CaseDetail[];
}

export const CardClientDetailsBody: FunctionComponent<CardBodyProps> = ({ cases }): ReactElement => {
  const statuses = ApplicationStatus;
  const list = cases?.map(({ applicationId, applicationStatusId }) => {
    const applicationStatus: ApplicationStatus = applicationStatusId;
    return (
      <Link key={applicationId} to={`cases/case/${applicationId}`}>
        <div className="s-card-client__detail">
          <div className="s-card-client__detail__content">
            <span>Case ID: {applicationId}</span>
            <Pill status={applicationStatus}>{statuses[applicationStatus]}</Pill>
          </div>
          <Icon name="chevronRight" />
        </div>
      </Link>
    );
  });
  return <CardBody>{list}</CardBody>;
};
