import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { EsisSummaryInterface } from 'shared/models';
import { Grid, Icon } from '../../../shared';
import { NoGridData } from '../../../shared';
import { GridColumn, GridRow } from '../../../shared/grid/grid';
import './illustration-table.scss';

interface illustrationTableProps {
  esisSummary: EsisSummaryInterface[];
  editPage: string;
}

export const IllustrationTable: FunctionComponent<illustrationTableProps> = ({ esisSummary, editPage }) => {
  const [illustrationDocuments, setIllustrationDocuments] = useState<[]>([]);
  const columns: GridColumn[] = [
    {
      id: 'description',
      description: 'Product',
    },
    {
      id: 'mortgageTerm',
      description: 'Product Term',
    },
    {
      id: 'productTypeId',
      description: 'Product Type',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return <>{row[column.id] === 1 ? 'Fixed' : 'Variable'}</>;
      },
    },
    {
      id: 'standardVariableRate',
      description: 'Subsequent Rate',
      render(column: GridColumn, row: GridRow) {
        return <>{`${row[column.id]}%`}</>;
      },
    },
    {
      id: 'minimumLoanToValue',
      description: 'LTV',
      render(column: GridColumn, row: GridRow) {
        return <>{`${row.minimumLoanToValue} - ${row.maximumLoanToValue}%`}</>;
      },
    },
    {
      id: 'download',
      description: '',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return (
          <Link to="/" className="c-btn c-btn--secondary">
            <div className="c-illustration-table-download-button">
              <Icon name="download"></Icon>
            </div>
            Download
          </Link>
        );
      },
    },
    {
      id: 'edit',
      description: '',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return (
          <Link to={editPage ?? '/'} className="c-btn c-btn--secondary">
            <div className="c-illustration-table-edit-button">
              <Icon name="illustration" colour="primary"></Icon>
            </div>
            Edit
          </Link>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      {esisSummary && (
        <Grid
          columns={columns}
          rowData={esisSummary}
          noRowsMessage={<NoGridData image="no-clients" message="You currently have no illustrations" />}
          showHeaders={esisSummary.length > 0}
          defaultDirection="Desc"
          defaultSortColumn="applicationId"
        />
      )}
    </React.Fragment>
  );
};
