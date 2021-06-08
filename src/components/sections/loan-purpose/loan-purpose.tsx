import React, { FunctionComponent, MouseEvent } from 'react';

import { Button } from '../../shared';

import { LoanPurposesInterface } from './loan-purpose.model';

import './loan-purpose.scss';

interface loanPurposeListInterface {
  loanPurposeList: LoanPurposesInterface[];
  setLoanPurpose: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const LoanPurpose: FunctionComponent<loanPurposeListInterface> = ({ loanPurposeList, setLoanPurpose }) => {
  return (
    <ul className="c-loan-purpose">
      {loanPurposeList.map((item: LoanPurposesInterface) => (
        <li key={item.id} className="c-loan-purpose__item">
          <span className="c-loan-purpose__value">{item.value}</span>
          <Button type="button" variant="primary" dataValue={item.id} onClick={setLoanPurpose}>
            Select
          </Button>
        </li>
      ))}
    </ul>
  );
};
