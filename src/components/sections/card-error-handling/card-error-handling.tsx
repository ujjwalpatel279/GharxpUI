import React, { FunctionComponent, ReactElement } from 'react';
import { Card } from '../../shared';
import { CardErrorHandlingBody } from './card-error-handling-body';
import { CardErrorHandlingFooter } from './card-error-handling-footer';
import { CardErrorHandlingHeader } from './card-error-handling-header';

interface CardErrorHandlingInterface {
  url?: string;
}

export const CardErrorHandling: FunctionComponent<CardErrorHandlingInterface> = ({ url }): ReactElement => {
  return (
    <Card>
      <CardErrorHandlingHeader />
      <CardErrorHandlingBody />
      <CardErrorHandlingFooter url={url} />
    </Card>
  );
};
