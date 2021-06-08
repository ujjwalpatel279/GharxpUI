import React from 'react';
import { CaseDetails } from './case-details';
import { render, cleanup } from '@testing-library/react';
import { AddressInterface, QuestionInterface } from '../../../shared/models';

const mockQuestions: QuestionInterface[] = [
  {
    id: 5678,
    applicantSpecific: true,
    wording: 'Loan Purpose',
    name: 'Loan Purpose?',
    dataType: 'STRING',
    placeHolder: 'Loan Purpose',
    required: true,
    value: 'Mortgage',
  },
  {
    id: 6789,
    applicantSpecific: true,
    wording: 'Loan Amount',
    name: 'Loan Amount',
    dataType: 'CURRENCY',
    placeHolder: 'Loan Amount',
    value: '155000',
  },
];
const mockAddress: AddressInterface = {
  propertyName: '',
  road: '',
  town: '',
  county: '',
  postCode: '',
};

describe('case-details component', () => {
  afterEach(cleanup);

  test('Records for the case are shown', async () => {
    const { getByText } = render(<CaseDetails applicationQuestions={mockQuestions} address={mockAddress} />);
    expect(getByText(`${mockQuestions[0].wording}:`)).toBeInTheDocument();
  });

  test('No case details', () => {
    const { getByText } = render(<CaseDetails applicationQuestions={[]} address={mockAddress} />);
    expect(getByText('No details are currently available.')).toBeInTheDocument();
  });
});
