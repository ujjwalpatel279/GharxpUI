import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ApplicantTable } from './applicant-table';
import { ApplicantInterface } from './applicant.model';

describe('Applicant Table Component', () => {
  afterEach(cleanup);

  const mainApplicantId = '';

  const customerList: ApplicantInterface[] = [];

  test('Shows no applicants message', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ApplicantTable
          selectFunction={() => null}
          applicantList={customerList}
          changeMainApplicant={() => null}
          mainApplicantId={mainApplicantId}
        />
      </BrowserRouter>,
    );

    expect(getByText('Select a client from your existing clients')).toBeInTheDocument();
  });

  test('Columns are visible on page', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ApplicantTable
          selectFunction={() => null}
          applicantList={customerList}
          changeMainApplicant={() => null}
          mainApplicantId={mainApplicantId}
        />
      </BrowserRouter>,
    );

    expect(getByText('First name')).toBeInTheDocument();
    expect(getByText('Last name')).toBeInTheDocument();
    expect(getByText('Main applicant')).toBeInTheDocument();
    expect(getByText('Remove')).toBeInTheDocument();
  });
});
