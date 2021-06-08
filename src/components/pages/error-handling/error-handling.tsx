import React, { FunctionComponent, ReactElement } from 'react';
import { CardErrorHandling } from '../../sections';

import { Container } from '../../shared';

import './error-handling.scss';

interface ErrorPageInterface {
  location?: {
    state: {
      previousPath?: string;
    };
  };
}

export const ErrorHandling: FunctionComponent<ErrorPageInterface> = ({ location }): ReactElement => {
  return (
    <section>
      <Container>
        <div className="c-bad-redirects u-mt-6">
          <CardErrorHandling url={location?.state?.previousPath} />
        </div>
      </Container>
    </section>
  );
};
