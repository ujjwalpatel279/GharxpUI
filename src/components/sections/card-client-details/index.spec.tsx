import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, waitFor } from '@testing-library/react';

import { CardClientDetails } from './index';

const clientObj = {
  id: 1,
  firstName: 'foo',
  surname: 'bar',
  titleId: 1,
  dateOfBirth: 'string',
  email: 'string',
  mobileNumber: 'string',
  address: {
    id: 2,
    propertyName: 'edx',
    propertyNumber: '101',
    road: 'amazing road',
    town: 'Casablanca',
    county: 'Tibet',
    postCode: 'tt11 11tt',
  },
  correspondenceAddress: {
    id: 2,
    propertyName: 'omega',
    propertyNumber: '987',
    road: 'top road',
    town: 'Bangkok',
    county: 'Yokohama',
    postCode: 'YY32 5LP',
  },
};

const casesObject = [
  {
    applicationId: 123432,
    applicationStatus: 1,
    applicationStatusId: 1,
    productName: '123432',
    loanAmount: '0',
    ltvValue: '',
    firstName: '',
    surname: '',
    telephone: '',
    email: '',
    totalRowCount: 0,
    lastUpdatedDate: '',
    isContinueEnable: false,
    isViewEnable: false,
  },
];

describe('shows card details', () => {
  afterEach(cleanup);
  it('show client first name and surname in the card', async () => {
    await waitFor(() => {
      const { getByText } = render(
        <BrowserRouter>
          <CardClientDetails client={clientObj} cases={casesObject} />
        </BrowserRouter>,
      );
      expect(getByText(`${clientObj.firstName} ${clientObj.surname}`)).toBeTruthy();
    });
  });
  it('renders the client town', () => {
    waitFor(() => {
      const { getByText } = render(
        <BrowserRouter>
          <CardClientDetails client={clientObj} cases={casesObject} />
        </BrowserRouter>,
      );
      expect(getByText(clientObj?.address?.town)).toBeTruthy();
    });
  });
});
