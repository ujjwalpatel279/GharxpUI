import React, { FunctionComponent, MouseEvent, ReactElement, useState } from 'react';
import { ApplicantInterface } from '../applicants/applicant.model';
import { Card } from '../../shared';
import { CaseApplicantsDetailsFooter } from './case-applicants-details-footer';
import { CaseApplicantsDetailsBody } from './case-applicants-details-body';
import { CaseApplicantsDetailsHeader } from './case-applicants-details-header';

import './case-applicants.scss';
import { CustomerDocumentsInterface } from '../../../shared/models';
import { DocumentRefresh } from '../../pages/clients/clients';

interface CaseApplicantsProps {
  applicant: ApplicantInterface;
  handleExpand?: (e: MouseEvent<HTMLButtonElement>) => void;
  documents: CustomerDocumentsInterface[];
  documentUrl: string;
  clientId: number;
  documentGridRefresh: DocumentRefresh;
}

export const CaseApplicantsDetails: FunctionComponent<CaseApplicantsProps> = ({
  applicant,
  documents,
  documentUrl,
  documentGridRefresh,
  clientId,
}): ReactElement => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleExpand: (e: MouseEvent<HTMLButtonElement>) => void = () => {
    setExpanded(!expanded);
  };
  return (
    <Card>
      <CaseApplicantsDetailsHeader
        firstName={applicant.firstName}
        surname={applicant.surname}
        isMainApplicant={applicant.isMainApplicant}
        email={applicant.email}
        mobileNumber={applicant.mobileNumber}
      />
      <CaseApplicantsDetailsBody documents={!expanded ? documents.slice(0, 3) : documents} documentUrl={documentUrl} />
      <CaseApplicantsDetailsFooter
        expanded={expanded}
        handleExpand={handleExpand}
        clientId={clientId}
        documentGridRefresh={documentGridRefresh}
        documentsExist={documents.length}
      />
    </Card>
  );
};
