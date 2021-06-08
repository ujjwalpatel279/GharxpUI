import React, { FunctionComponent, ReactElement } from 'react';
import { CardBody } from '../../shared/card/card-body';
import { Button, Icon } from '../../shared';

import './card-clients.scss';
import { CustomerDocumentsInterface } from '../../../shared/models';

interface CardBodyProps {
  documents: CustomerDocumentsInterface[];
  documentUrl: string;
}

export const CardClientDownloadsBody: FunctionComponent<CardBodyProps> = ({ documents, documentUrl }): ReactElement => {
  if (documents.length) {
    const list = documents?.map(({ id, description, formId, mimeType }) => (
      <div className="s-card-client__detail" key={id}>
        <span className="doc-upload__success">
          <Icon name="tick" colour="primary" />
        </span>
        <div className="s-card-client__detail__content">
          <span>{description}</span>
        </div>
        <a href={documentUrl + id + '/' + formId + '.' + mimeType.split('/')[1]} target="_blank" rel="noreferrer">
          <Button type="button" variant="secondary" icon={'download'} iconPosition="left" size="small">
            Download
          </Button>
        </a>
      </div>
    ));
    return <CardBody>{list}</CardBody>;
  }
  return <CardBody>{'No Documents'}</CardBody>;
};
