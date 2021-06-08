import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { CaseApplicantsDetailsHeader } from './case-applicants-details-header';

const applicantObj = {
  firstName: 'George',
  surname: 'Smith',
  email: 'me@you.com',
};

describe('shows card details header', () => {
  afterEach(cleanup);
  it('show applicant email', () => {
    waitFor(() => {
      const { getByText } = render(
        <CaseApplicantsDetailsHeader
          firstName={applicantObj.firstName}
          surname={applicantObj.surname}
          email={applicantObj.email}
        />,
      );
      expect(getByText(applicantObj.email)).toBeTruthy();
    });
  });
});
