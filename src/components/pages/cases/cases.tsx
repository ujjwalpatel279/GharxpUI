import React, { FunctionComponent, ReactElement, useState, useEffect, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';

import { LOANPURPOSE } from '../../../config/routes';
import { GridColumn } from '../../shared/grid/grid';
import { Container, InputSearch, PageHeading, Section } from '../../shared';
import { services } from '../../../shared/api/services';

import { CaseDashboard } from '../../sections/index';
import { CaseDetail } from '../../sections/case-dashboard/caseDetail.model';

export const CasesPage: FunctionComponent = (): ReactElement => {
  const [caseDetails, setCaseDetails] = useState<CaseDetail[] | []>([]);
  const [sortColumn, setSortColumn] = useState<string>('ApplicationId');
  const [sortOrder, setSortOrder] = useState<string>('Desc');
  const [keyPressed, setKeyPressed] = useState<string | null>(' ');
  const pageSize = 10;

  const fetchCaseDetails = async (searchTerm: string) => {
    const caseDetails = (await services.getCaseSummary(searchTerm, 1, pageSize, sortColumn, sortOrder)).data;

    setCaseDetails(caseDetails);
    return caseDetails ?? [];
  };

  const fetchSortedData = async (column: GridColumn, order: string) => {
    setSortOrder(order);
    setSortColumn(column.id);
    const caseDetails = (await services.getCaseSummary(' ', 1, pageSize, column.id, order)).data;

    setCaseDetails(caseDetails);
    return caseDetails ?? [];
  };

  const handleKey: (event: KeyboardEvent<HTMLInputElement>) => void = (e) => {
    setKeyPressed(e.currentTarget.value);
  };

  const fetchPageData = async (pageNumber: number, pageSize: number) => {
    const caseDetails = (await services.getCaseSummary(' ', pageNumber, pageSize, sortColumn, sortOrder)).data;

    setCaseDetails(caseDetails);
    return caseDetails ?? [];
  };

  useEffect(() => {
    fetchCaseDetails(keyPressed);
  }, [keyPressed]);

  return (
    <>
      <PageHeading headingLevel={2} title="Cases" icon="cases" mb={6} />
      <Container fullWidth>
        <Section
          title="Your cases"
          mb={6}
          headerChildren={
            <div className="c-search-add">
              <InputSearch id="search-clients" onKeyUp={handleKey} />
              <div>
                <Link to={LOANPURPOSE.path} className="c-btn c-btn--primary">
                  Start New Case
                </Link>
              </div>
            </div>
          }
        >
          <CaseDashboard
            pageSize={pageSize}
            caseDetails={caseDetails}
            pageFunction={fetchPageData}
            sortFunction={fetchSortedData}
          />
        </Section>
      </Container>
    </>
  );
};
