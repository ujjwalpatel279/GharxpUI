import React, { FunctionComponent, MouseEvent, ReactElement, useState } from 'react';
import { Card } from '../../shared';
import { CardClientDownloadsFooter } from './card-client-downloads-footer';
import { CardClientDownloadsBody } from './card-client-downloads-body';
import { CardClientDownloadsHeader } from './card-client-downloads-header';

import { DocumentRefresh } from '../../pages/clients/clients';
import { CustomerDocumentsInterface } from '../../../shared/models';

import './card-clients.scss';

interface CardClientDocumentsProps {
  documents: CustomerDocumentsInterface[];
  documentUrl: string;
  clientId: number;
  documentGridRefresh: DocumentRefresh;
  handleExpand?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const CardClientDownloads: FunctionComponent<CardClientDocumentsProps> = ({
  documents,
  documentUrl,
  clientId,
  documentGridRefresh,
}): ReactElement => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleExpand: (e: MouseEvent<HTMLButtonElement>) => void = () => {
    setExpanded(!expanded);
  };
  return (
    <Card>
      <CardClientDownloadsHeader />
      <CardClientDownloadsBody documents={!expanded ? documents.slice(0, 3) : documents} documentUrl={documentUrl} />
      <CardClientDownloadsFooter
        clientId={clientId}
        documentGridRefresh={documentGridRefresh}
        documentsExist={documents.length}
        expanded={expanded}
        handleExpand={handleExpand}
      />
    </Card>
  );
};
