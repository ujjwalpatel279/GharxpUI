import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { CardClientDetailsHeader } from './card-client-details-header';

const clientObj = {
  firstName: 'George',
  surname: 'Smith',
  address: {
    id: 2,
    propertyName: 'flower',
    propertyNumber: '999',
    road: 'dream road',
    town: 'London',
    county: 'Bristol',
    postCode: 'ZZ00 0ZZ',
  },
};

describe('shows card details header', () => {
  afterEach(cleanup);
  it('show client card header', () => {
    waitFor(() => {
      const { getByText } = render(
        <CardClientDetailsHeader
          firstName={clientObj.firstName}
          surname={clientObj.surname}
          address={clientObj.address}
        />,
      );
      expect(getByText(clientObj.address.postCode)).toBeTruthy();
    });
  });
});
