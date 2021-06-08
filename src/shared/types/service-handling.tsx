import React from 'react';
import { Redirect } from 'react-router';

import { ERRORHANDLING } from '../../config/routes';

export interface ServiceHandlingInterface<T> {
  data: T;
  loading: boolean;
  error: boolean | undefined;
}

const hasError = (params: ServiceHandlingInterface<any>[]): boolean => {
  const failedCall = params.find((result) => result.error);
  if (failedCall) return true;
  return false;
};

const defaultErrorResponse = () => {
  const url = window.location.href.replace(window.location.origin, '');
  return (
    <Redirect
      to={{
        pathname: ERRORHANDLING.path,
        state: {
          previousPath: url,
        },
      }}
    />
  );
};

export { hasError, defaultErrorResponse };
