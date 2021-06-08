import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../shared';
import { services } from '../../../shared';

interface UrlParamInterface {
  brokerGuid: string;
  uniqueOrderCode?: string;
  applicationFeeSummaryId?: string;
}

export const WorldPayPage: FunctionComponent = (): ReactElement => {
  const { uniqueOrderCode, applicationFeeSummaryId } = useParams<UrlParamInterface>();
  const fetchWorldPayResponse = async () => {
    await services.worldPayOrderResponse(uniqueOrderCode, applicationFeeSummaryId, location.search);
  };
  useEffect(() => {
    if ((uniqueOrderCode ?? '') === '' && (applicationFeeSummaryId ?? '') === '') {
      location.href = location.search.substr(1, location.search.length - 1);
    } else {
      fetchWorldPayResponse();
    }
  }, []);

  return (
    <section>
      <Container>
        {(uniqueOrderCode ?? '') === '' && (applicationFeeSummaryId ?? '') === '' && (
          <div>Loading Worldpay Redirection Url</div>
        )}
        {(uniqueOrderCode ?? '') !== '' && (applicationFeeSummaryId ?? '') !== '' && (
          <div>Processing completed. Please shut down this window</div>
        )}
      </Container>
    </section>
  );
};
