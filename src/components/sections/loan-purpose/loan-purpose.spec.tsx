import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { LoanPurpose } from './loan-purpose';

const mockData = [
  {
    id: 1,
    value: 'Re-Mortgage',
  },
  {
    id: 2,
    value: 'Buy to let',
  },
];

describe('Loan Purpose Component', () => {
  afterEach(cleanup);

  test('Shows correct text', async () => {
    const { getByText, findAllByText } = render(
      <BrowserRouter>
        <LoanPurpose loanPurposeList={mockData} setLoanPurpose={() => null} />
      </BrowserRouter>,
    );

    expect(getByText('Re-Mortgage')).toBeInTheDocument();
    expect(getByText('Buy to let')).toBeInTheDocument();

    const allSelectBtns = await findAllByText('Select');
    expect(allSelectBtns).toHaveLength(2);
  });
});
