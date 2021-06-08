import React, { FunctionComponent, MouseEvent, useState, useEffect, ReactElement, useMemo } from 'react';
import { CustomerDocumentsInterface } from '../../../shared/models';
import { ApplicantInterface } from '../applicants/applicant.model';
import { services } from '../../../shared';
import { CaseApplicantsDetails } from '../case-applicant-details';

import './client-details.scss';
import { DocumentRefresh } from '../../pages/clients/clients';

interface ClientDetailsInterface {
  deleteDocument: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  applicant: ApplicantInterface;
  fetchData?: (id: number) => Promise<CustomerDocumentsInterface[]>;
  index?: number;
  documentList?: CustomerDocumentsInterface[];
  showModal: (e: MouseEvent<HTMLButtonElement>) => void;
  modalVisible?: boolean;
}

export const ClientDetails: FunctionComponent<ClientDetailsInterface> = ({
  applicant,
  fetchData,
  documentList,
  deleteDocument,
}): ReactElement => {
  const [displayData, setDisplayData] = useState<CustomerDocumentsInterface[]>([]);
  const [customerDocumentUrl, setCustomerDocumentUrl] = useState<string>('');
  const [forceUpdateCount, setForceUpdateCount] = useState(0);
  const forceUpdate = () => setForceUpdateCount((forceUpdateCount) => forceUpdateCount + 1);

  const deleteDoc: (e: MouseEvent<HTMLButtonElement>) => void = (e) => {
    deleteDocument(e).then(() => {
      forceUpdate();
    });
  };
  const documentGridRefresh: DocumentRefresh = async () => {
    if (applicant?.customerId) {
      fetchData(applicant?.customerId)
        .then((result) => {
          setDisplayData(result);
        })
        .catch(() => {
          setDisplayData([]);
        });
    }
  };

  useEffect(() => {
    documentList ? setDisplayData(documentList) : documentGridRefresh();

    services.getCustomerDocumentUrl().then((result) => {
      setCustomerDocumentUrl(result);
    });
  }, [documentList, applicant, forceUpdateCount]);
  const renderApplicantsDetails = useMemo(
    () => (
      <CaseApplicantsDetails
        applicant={applicant}
        clientId={applicant?.customerId}
        documents={displayData}
        documentUrl={customerDocumentUrl}
        documentGridRefresh={documentGridRefresh}
      />
    ),
    [applicant, customerDocumentUrl, displayData],
  );
  return <div>{renderApplicantsDetails}</div>;
};
