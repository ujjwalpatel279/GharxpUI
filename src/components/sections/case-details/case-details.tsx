import React, { FunctionComponent, useState } from 'react';
import { services } from '../../../shared';
import { AddressInterface, QuestionInterface } from '../../../shared/models';
import { Grid, Heading } from '../../shared';
import { GridColumn, GridRow } from '../../shared/grid/grid';
import './case-details.scss';
import { formatAddress } from '../../../shared/utils';

interface CaseDetailsInterface {
  applicationQuestions: QuestionInterface[];
  address: AddressInterface;
}

export const CaseDetails: FunctionComponent<CaseDetailsInterface> = ({ applicationQuestions, address }) => {
  const [fetchedAddress, setFetchedAddress] = useState<string>();
  if (!fetchedAddress && applicationQuestions) {
    const questionAddress = applicationQuestions?.find((question) => question.dataType === 'ADDRESS');
    if (questionAddress?.value)
      services
        .getAddress(Number(questionAddress.value))
        .then((result) => setFetchedAddress(formatAddress(result.data)));
  }
  const columns: GridColumn[] = [
    {
      id: 'wording',
      description: 'Details',
      render(column: GridColumn, row: GridRow) {
        return <>{`${row[column.id]}:`}</>;
      },
    },
    {
      id: 'value',
      description: '',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        let displayValue = row[column.id];
        switch (row['dataType']) {
          case 'CURRENCY':
            displayValue = `£ ${Number(row[column.id])
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
            break;
          case 'ADDRESS':
            displayValue = fetchedAddress ?? formatAddress(address);
            break;
          case 'PERCENTAGE':
            displayValue = row[column.id] ? `${row[column.id]} %` : '';
            break;
        }
        return <>{displayValue}</>;
      },
    },
  ];
  return (
    <div>
      <div>
        <Heading extendClass="c-case-details__header-title" level="h2" title="Details" />
      </div>
      <Grid
        showHeaders={false}
        extendClass="c-case-details"
        rowData={applicationQuestions}
        columns={columns}
        noRowsMessage="No details are currently available."
      />
    </div>
  );
};
