import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Grid, Pill } from '../../shared';
import { GridColumn, GridRow } from '../../../components/shared/grid/grid';
import { CaseDetail } from './caseDetail.model';
import { NoGridData } from '../../../components/shared/grid-no-data/no-grid-data';
import { ApplicationStatus } from '../../../shared/types/enums';

interface CaseDashboardInterface {
  caseDetails: CaseDetail[];
  pageSize: number;
  pageFunction?: (pageNumber: number, pageSize: number) => Promise<GridRow[]>;
  sortFunction?: (column: GridColumn, order: string) => Promise<GridRow[]>;
}

export const CaseDashboard: FunctionComponent<CaseDashboardInterface> = ({
  caseDetails,
  pageSize,
  pageFunction,
  sortFunction,
}): ReactElement => {
  const [pageCount, setPageCount] = useState(1);

  const columns = [
    {
      id: 'applicationId',
      description: 'Case Id',
    },
    {
      id: 'applicationStage',
      description: 'Application Stage',
    },
    {
      id: 'applicationStatusId',
      description: 'Status',
      render(column: GridColumn, row: GridRow) {
        const appStatus: ApplicationStatus = row[column.id];
        return <Pill status={appStatus}>{row[column.id]}</Pill>;
      },
    },
    {
      id: 'productName',
      description: 'Product Selected',
    },
    {
      id: 'loanAmount',
      description: 'Loan Value',
    },
    {
      id: 'ltvValue',
      description: 'LTV',
    },
    {
      id: 'lastUpdatedDate',
      description: 'Date of last action',
      render(column: GridColumn, row: GridRow) {
        const date: Date = new Date(Date.parse(row[column.id] ?? Date.now));
        return <>{date.toLocaleDateString()}</>;
      },
    },
    {
      id: 'firstName',
      description: 'Main Applicant Name',
      render(column: GridColumn, row: GridRow) {
        return <>{`${row.firstName} ${row.surname}`}</>;
      },
    },
    {
      id: 'email',
      description: 'Number & Email',
      render(column: GridColumn, row: GridRow) {
        return <>{`${row.email} ${row.telephone}`}</>;
      },
    },
    {
      id: 'continue',
      description: 'Continue',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return (
          <>
            {row.isContinueEnable && (
              <Link to={`cases/application/${row.applicationId}`} className="c-btn c-btn--secondary">
                Continue
              </Link>
            )}
          </>
        );
      },
    },
    {
      id: 'view',
      description: 'View',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return (
          <>
            {row.isViewEnable && (
              <Link to={`cases/case/${row.applicationId}`} className="c-btn c-btn--secondary">
                View
              </Link>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    let count = 1;
    if (caseDetails && caseDetails.length > 0) count = caseDetails[0]?.totalRowCount || 1;
    setPageCount(count);
  }, [caseDetails]);

  return (
    <React.Fragment>
      <Grid
        columns={columns}
        rowData={caseDetails}
        maxPage={pageCount}
        pageSize={pageSize}
        gotoPage={pageFunction}
        sortRows={sortFunction}
        noRowsMessage={<NoGridData image="no-clients" message="You currently have no cases" />}
        showHeaders={caseDetails && caseDetails.length > 0}
        defaultDirection="Desc"
        defaultSortColumn="applicationId"
      />
    </React.Fragment>
  );
};
