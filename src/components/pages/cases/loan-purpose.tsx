import React, { FunctionComponent, ReactElement, useState, useEffect, MouseEvent } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Heading, PageHeading } from '../../shared';

import { services } from '../../../shared';
import { APPLICANTS } from '../../../config/routes';
import { LoanPurpose } from '../../sections';
import { LoanPurposesInterface } from '../../sections/loan-purpose/loan-purpose.model';

import { defaultErrorResponse, hasError, ServiceHandlingInterface } from '../../../shared/types/service-handling';

export const loanPurposeInitialState: ServiceHandlingInterface<LoanPurposesInterface[]> = {
  data: [],
  loading: false,
  error: false,
};

export const LoanPurposePage: FunctionComponent = (): ReactElement => {
  const [loanPurposeList, setLoanPurposeList] = useState<LoanPurposesInterface[] | []>([]);
  const [selectedLoanPurpose, setSelectedLoanPurpose] = useState<string | null>(null);
  const [loanPurposeHandling, setLoanPurposeHandling] = useState<ServiceHandlingInterface<LoanPurposesInterface[]>>(
    loanPurposeInitialState,
  );

  const fetchLoanPurposeData = async () => {
    setLoanPurposeHandling({ ...loanPurposeHandling, loading: true });
    const res = await services.getLoanPurposes();
    setLoanPurposeHandling(res);
    if (res.data) setLoanPurposeList(res.data);
  };

  const handleLoanPurposeSelection = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedLoanPurpose = e.currentTarget.getAttribute('data-value');
    setSelectedLoanPurpose(selectedLoanPurpose);
  };

  useEffect(() => {
    fetchLoanPurposeData();
  }, []);

  if (selectedLoanPurpose) {
    return <Redirect to={{ pathname: APPLICANTS.path, state: { loanPurposeId: selectedLoanPurpose } }} />;
  }

  if (hasError([loanPurposeHandling])) {
    return defaultErrorResponse();
  }

  return (
    <section>
      <PageHeading headingLevel={2} icon="products" title="Loan Purpose" mb={6} />
      <Container>
        <LoanPurpose loanPurposeList={loanPurposeList} setLoanPurpose={handleLoanPurposeSelection} />
      </Container>
    </section>
  );
};
