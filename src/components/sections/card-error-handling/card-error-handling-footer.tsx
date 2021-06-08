import React, { FunctionComponent, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import { CardFooter } from '../../shared/card/card-footer';
import { Button } from '../../shared/button/button';

import './card-error-handling.scss';
interface CardErrorHandlingFooterInterface {
  url?: string;
}
export const CardErrorHandlingFooter: FunctionComponent<CardErrorHandlingFooterInterface> = ({ url }): ReactElement => {
  const history = useHistory();

  const tryAgain = () => {
    if (url && url.length > 1) {
      history.push(url);
    } else {
      history.goBack;
    }
  };

  return (
    <CardFooter>
      <footer>
        <div>
          <Button type="button" variant="primary" childClasses="full-width" onClick={tryAgain}>
            Try Again
          </Button>
        </div>
      </footer>
    </CardFooter>
  );
};
