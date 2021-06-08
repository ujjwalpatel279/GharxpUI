import { Button } from '../../shared';
import React, { useState, FunctionComponent, ReactElement, MouseEvent } from 'react';
import { CardFooter } from '../../shared/card/card-footer';
import { UploadDocument } from '../upload-document/upload-document';
import { DocumentRefresh } from '../../pages/clients/clients';

import './case-applicants.scss';

interface CardFooterProps {
  clientId?: number;
  documentGridRefresh: DocumentRefresh;
  documentsExist: number;
  handleExpand?: (e: MouseEvent<HTMLButtonElement>) => void;
  expanded: boolean;
}

export const CaseApplicantsDetailsFooter: FunctionComponent<CardFooterProps> = ({
  clientId,
  documentGridRefresh,
  documentsExist,
  expanded,
  handleExpand,
}): ReactElement => {
  const [showAddClient, toggleShowAddClient] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [customerIdForUpload, setCustomerIdForUpload] = useState<number>(clientId);
  const showModal = () => {
    setModalVisible(true);
    setCustomerIdForUpload(clientId);
  };

  const reloadDocumentGrid = async () => {
    await documentGridRefresh();
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  return (
    <CardFooter>
      <UploadDocument
        customerId={customerIdForUpload}
        reloadDocumentGrid={reloadDocumentGrid}
        show={modalVisible}
        handleClose={hideModal}
      />
      <footer className={`s-card-client__detail ${documentsExist > 3 ? '' : 's-card-client__detail-partial'}`}>
        {documentsExist > 3 && (
          <button onClick={handleExpand} className={'s-card-client__detail__button notes__text u-fs-2'}>
            <b>{expanded ? 'See less' : 'See more'}</b>
          </button>
        )}
        <Button
          type="button"
          variant="secondary"
          icon={showAddClient ? 'close' : 'plus'}
          iconPosition="left"
          onClick={showModal}
          size="small"
        >
          {showAddClient ? 'Close' : 'Add document'}
        </Button>
      </footer>
    </CardFooter>
  );
};
