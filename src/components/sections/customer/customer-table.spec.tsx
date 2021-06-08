import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CustomerTable } from './customer-table';
import { CustomerInterface } from './customer.model';

describe('Customer Table Component', () => {
  afterEach(cleanup);

  const customerList: CustomerInterface[] = [];

  test('Shows no applicants message', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <CustomerTable
          selectFunction={() => null}
          customerList={customerList}
          pageSize={2}
          formTitles={[]}
          selectEnabled={true}
          handleKey={() => null}
        />
      </BrowserRouter>,
    );

    expect(getByText('You currently have no clients')).toBeInTheDocument();
  });

  test('Columns are visible on page', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <CustomerTable
          selectFunction={() => null}
          customerList={customerList}
          selectEnabled={true}
          pageSize={2}
          formTitles={[]}
          handleKey={() => null}
        />
      </BrowserRouter>,
    );

    expect(getByText('First name')).toBeInTheDocument();
    expect(getByText('Last name')).toBeInTheDocument();
    expect(getByText('D.O.B')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Postcode')).toBeInTheDocument();
  });
});
