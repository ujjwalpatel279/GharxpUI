import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { FeeInterface } from '../../../../shared/models';
import { AddFees, FeeType } from './add-fees';

describe('Add Fees Component', () => {
  afterEach(cleanup);

  const mockFeeDescription = 'Test Fee';

  const mockFees: FeeInterface[] = [
    {
      amount: 25.83,
      feeCode: 'TestFee',
      feeId: 13,
      name: mockFeeDescription,
      selected: true,
      payableOn: 'On Application',
    } as FeeInterface,
    {
      amount: 13.43,
      feeCode: 'TestFee',
      feeId: 13,
      name: `${mockFeeDescription} 2`,
      selected: false,
      payableOn: 'On Application',
    } as FeeInterface,
  ];

  const mockFetch: (caseId: number, formId: number, feeType: FeeType) => Promise<FeeInterface[]> = jest.fn();

  test('Shows title on page and empty message for grid', async () => {
    const { getByText } = render(
      <AddFees
        caseId={1}
        formId={1}
        feeData={null}
        heading={'Fees that can be added to the loan amount'}
        noRowsMessage={`No fees can be added to this loan`}
        feeType={FeeType.AddToLoan}
      />,
    );

    // Grid columns
    expect(getByText('Fee Name')).toBeInTheDocument();
    expect(getByText('Fee amount')).toBeInTheDocument();
    expect(getByText('Select')).toBeInTheDocument();
    expect(getByText('Remove')).toBeInTheDocument();

    // Empty table message
    expect(getByText('No fees can be added to this loan')).toBeInTheDocument();
  });

  test('Show grid with addable fees', async () => {
    const { getByText, getByAltText } = render(
      <AddFees
        caseId={1}
        formId={1}
        feeData={mockFees}
        heading={'Fees that can be added to the loan amount'}
        noRowsMessage={`No fees can be added to this loan`}
        feeType={FeeType.AddToLoan}
      />,
    );

    expect(getByText(mockFeeDescription)).toBeInTheDocument();
    expect(getByText('Add Fees to Loan')).toBeInTheDocument();
  });

  test('Show grid with added fees', async () => {
    mockFees[0].selected = true;
    const { getByText } = render(
      <AddFees
        caseId={1}
        formId={1}
        feeData={mockFees}
        heading={'Fees that can be added to the loan amount'}
        noRowsMessage={`No fees can be added to this loan`}
        feeType={FeeType.AddToLoan}
      />,
    );

    const total = mockFees?.map((fee) => (fee.selected ? fee.amount : 0)).reduce((prev, next) => (prev ?? 0) + next);
    const expectedResult = `You have added £${total} to the loan amount.`;

    expect(getByText(expectedResult)).toBeInTheDocument();
  });
});
