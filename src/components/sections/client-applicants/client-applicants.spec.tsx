import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ClientApplicants } from './client-applicants';
import { ApplicantInterface } from '../applicants/applicant.model';
import { CaseInterface } from '../question-sets/section-menu';

describe('Customer Applicants Component', () => {
  afterEach(cleanup);

  const applicant: ApplicantInterface = {
    firstName: 'First',
    id: '1',
    surname: 'Last',
    isMainApplicant: true,
  };

  const caseDetails: CaseInterface = {
    applicants: [applicant],
    applicationStatusId: 1,
    customerId: 1,
    organisationId: 1,
    id: 1,
  };

  test('Shows applicant name, whether main and icon', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ClientApplicants caseDetails={caseDetails} />
      </BrowserRouter>,
    );

    expect(getByText('FL')).toBeInTheDocument();
    expect(getByText('Main Applicant')).toBeInTheDocument();
    expect(getByText('First Last')).toBeInTheDocument();
    expect(getByText('Add document')).toBeInTheDocument();
  });
});
