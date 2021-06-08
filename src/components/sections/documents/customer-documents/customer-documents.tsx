import React, { FunctionComponent, MouseEvent, useState, useEffect, ReactElement } from 'react';
import { CustomerDocumentsInterface } from '../../../../shared/models/customer-documents.model';
import { Button, Grid, Icon } from '../../../shared';
import { GridColumn, GridRow } from '../../../../components/shared/grid/grid';

import './customer-documents.scss';
import { ApplicantInterface } from '../../applicants/applicant.model';
import { services } from '../../../../shared/api/services';

interface DocumentTableInterface {
  deleteDocumentFunction: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  applicant: ApplicantInterface;
  fetchData?: (id: number) => Promise<CustomerDocumentsInterface[]>;
  index?: number;
  documentList?: CustomerDocumentsInterface[];
  showModal: (e: MouseEvent<HTMLButtonElement>) => void;
  modalVisible?: boolean;
  refresh?: boolean;
}

export const CustomerDocumentsTable: FunctionComponent<DocumentTableInterface> = ({
  deleteDocumentFunction,
  applicant,
  fetchData,
  index,
  documentList,
  showModal,
  modalVisible,
  refresh,
}): ReactElement => {
  const [displayData, setDisplayData] = useState<CustomerDocumentsInterface[]>([]);
  const [customerDocumentUrl, setCustomerDocumentUrl] = useState<string>('');
  const [forceUpdateCount, setForceUpdateCount] = useState(0);
  const forceUpdate = () => setForceUpdateCount((forceUpdateCount) => forceUpdateCount + 1);

  const deleteDocument: (e: MouseEvent<HTMLButtonElement>) => void = (e) => {
    deleteDocumentFunction(e).then(() => {
      forceUpdate();
    });
  };
  const columns = [
    {
      id: 'docType',
      description: 'Category',
    },
    {
      id: 'description',
      description: 'Document Name',
    },
    {
      id: 'id',
      description: 'Delete',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return (
          <button type="button" onClick={deleteDocument} data-value={row.id}>
            <Icon name="close" />
            <span className="u-hidden-visually">Remove document</span>
          </button>
        );
      },
    },
    {
      id: 'view',
      description: '',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return <a href={customerDocumentUrl + row.id}>View</a>;
      },
    },
  ];

  useEffect(() => {
    fetchData
      ? fetchData(applicant?.customerId)
          .then((result) => {
            //console.log('fetching data from grid: ' + applicant?.customerId);
            //console.log(result);
            setDisplayData(result);
          })
          .catch(() => {
            setDisplayData([]);
          })
      : setDisplayData(documentList);
    services.getCustomerDocumentUrl().then((result: React.SetStateAction<string>) => {
      setCustomerDocumentUrl(result);
    });
  }, [forceUpdateCount, refresh]);

  return (
    <div>
      <span className="c-customer-document-label">
        {applicant?.firstName} {applicant?.surname} :{' '}
        {applicant?.isMainApplicant ? 'Main Applicant' : 'Applicant ' + (index + 1)}
      </span>
      <div className="c-customer-grid">
        <Grid pinned={'right'} rowData={displayData} columns={columns} noRowsMessage="No existing client documents" />
      </div>
      {!(modalVisible ?? false) && (
        <Button type="button" variant="secondary" size="small" dataValue={applicant?.customerId} onClick={showModal}>
          Upload File
        </Button>
      )}
    </div>
  );
};
