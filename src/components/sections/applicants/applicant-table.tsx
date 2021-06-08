import React, { FunctionComponent, ReactElement, MouseEvent, ChangeEvent } from 'react';
import { ApplicantInterface } from './applicant.model';
import { Grid, Icon, Section } from '../../shared';
import { GridColumn, GridRow } from 'components/shared/grid/grid';
import { NoGridData } from '../../shared/grid-no-data/no-grid-data';

interface ApplicantTableInterface {
  changeMainApplicant: (e: ChangeEvent<HTMLInputElement>) => void;
  selectFunction: (e: MouseEvent<HTMLButtonElement>) => void;
  applicantList: ApplicantInterface[];
  mainApplicantId: string;
}
export const ApplicantTable: FunctionComponent<ApplicantTableInterface> = ({
  changeMainApplicant,
  selectFunction,
  applicantList,
  mainApplicantId,
}): ReactElement => {
  const columns = [
    {
      id: 'firstName',
      description: 'First name',
    },
    {
      id: 'surname',
      description: 'Last name',
    },
    {
      id: 'isMain',
      description: 'Main applicant',
      render(column: GridColumn, row: GridRow) {
        return (
          <input
            type="radio"
            name="isPrimary"
            checked={row.id.toString() == mainApplicantId}
            onChange={changeMainApplicant}
            data-value={row.id}
          />
        );
      },
    },
    {
      id: 'id',
      description: 'Remove',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return (
          <button type="button" className="c-btn c-btn--close" onClick={selectFunction} data-value={row.id}>
            <Icon name="close" />
            <span className="u-hidden-visually">Remove client</span>
          </button>
        );
      },
    },
  ];
  return (
    <Section title="Selected Clients">
      <Grid
        rowData={applicantList}
        columns={columns}
        noRowsMessage={<NoGridData image="no-applicants" message="Select a client from your existing clients" />}
        showHeaders={applicantList && applicantList.length > 0}
      />{' '}
    </Section>
  );
};
