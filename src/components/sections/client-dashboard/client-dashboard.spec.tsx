import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ClientDashboard } from './client-dashboard';
import { CustomerInterface } from '../customer/customer.model';

import { TitleInterface } from '../../../shared/models';

describe('Customer Table Component', () => {
  afterEach(cleanup);

  const clientList: CustomerInterface[] = [];

  const formTitles: TitleInterface[] = [];

  test('Shows no client message', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ClientDashboard clientList={clientList} pageSize={2} handleKey={() => null} formTitles={formTitles} />
      </BrowserRouter>,
    );

    expect(getByText('You currently have no clients')).toBeInTheDocument();
  });

  test('Columns are visible on page', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ClientDashboard clientList={clientList} pageSize={2} handleKey={() => null} formTitles={formTitles} />
      </BrowserRouter>,
    );

    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('First name')).toBeInTheDocument();
    expect(getByText('Last name')).toBeInTheDocument();
    expect(getByText('Date of birth')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Telephone')).toBeInTheDocument();
  });
});
