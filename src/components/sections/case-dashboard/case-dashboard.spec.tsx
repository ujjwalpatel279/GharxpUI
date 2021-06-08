import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CaseDashboard } from './case-dashboard';
import { CaseDetail } from '../../sections/case-dashboard/caseDetail.model';

describe('Case Dashboard Table Component', () => {
  afterEach(cleanup);

  const caseDetails: CaseDetail[] = [];

  test('Shows no existing cases message', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <CaseDashboard caseDetails={caseDetails} pageSize={2} sortFunction={() => null} pageFunction={() => null} />
      </BrowserRouter>,
    );

    expect(getByText('You currently have no cases')).toBeInTheDocument();
  });

  test('Columns are visible on page', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <CaseDashboard caseDetails={caseDetails} pageSize={2} sortFunction={() => null} pageFunction={() => null} />
      </BrowserRouter>,
    );

    expect(getByText('Case Id')).toBeInTheDocument();
    expect(getByText('Application Stage')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();
    expect(getByText('Product Selected')).toBeInTheDocument();
    expect(getByText('Loan Value')).toBeInTheDocument();
    expect(getByText('LTV')).toBeInTheDocument();
    expect(getByText('Date of last action')).toBeInTheDocument();
    expect(getByText('Main Applicant Name')).toBeInTheDocument();
    expect(getByText('Number & Email')).toBeInTheDocument();
  });
});
