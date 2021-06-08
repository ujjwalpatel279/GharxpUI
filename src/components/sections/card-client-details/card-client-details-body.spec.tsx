import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, waitFor } from '@testing-library/react';
import { CardClientDetailsBody } from './card-client-details-body';
import { CaseDetail } from '../case-dashboard/caseDetail.model';

const casesObject: CaseDetail[] = [
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
describe('shows card details body', () => {
  afterEach(cleanup);
  it('show client information on card', () => {
    waitFor(() => {
      const { getByText } = render(
        <BrowserRouter>
          <CardClientDetailsBody cases={casesObject} />
        </BrowserRouter>,
      );
      expect(getByText(casesObject[0]?.applicationId)).toBeTruthy();
    });
  });
});
