import React, { FunctionComponent, ReactElement, useEffect, useState, MouseEvent, KeyboardEvent } from 'react';
import { CustomerInterface } from './customer.model';
import { Grid, InputSearch, Section } from '../../shared';
import { GridColumn, GridRow } from 'components/shared/grid/grid';
import { Button } from '../../shared/button/button';
import { AddClient } from '..';
import { NoGridData } from '../../shared/grid-no-data/no-grid-data';

import { TitleInterface } from '../../../shared/models';

import './customer-table.scss';

interface CustomerTableInterface {
  selectFunction: (e: MouseEvent<HTMLButtonElement>) => void;
  customerList: CustomerInterface[];
  pageSize: number;
  selectEnabled: boolean;
  formTitles: TitleInterface[];
  pageFunction?: (pageNumber: number, pageSize: number) => Promise<GridRow[]>;
  sortFunction?: (column: GridColumn, order: string) => Promise<GridRow[]>;
  handleKey: (e: KeyboardEvent<HTMLInputElement>) => void;
  fetchCustomers?: (searchTerm: string) => void;
}

export const CustomerTable: FunctionComponent<CustomerTableInterface> = ({
  customerList,
  pageSize,
  selectFunction,
  pageFunction,
  sortFunction,
  selectEnabled,
  handleKey,
  formTitles,
  fetchCustomers,
}): ReactElement => {
  const [showAddClient, toggleShowAddClient] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const columns = [
    {
      id: 'id',
      hidden: true,
    },
    {
      id: 'firstName',
      description: 'First name',
    },
    {
      id: 'surname',
      description: 'Last name',
    },
    {
      id: 'dateOfBirth',
      description: 'D.O.B',
      render(column: GridColumn, row: GridRow) {
        const date: Date = new Date(Date.parse(row[column.id] ?? Date.now));
        return <>{date.toLocaleDateString()}</>;
      },
    },
    {
      id: 'email',
      description: 'Email',
    },
    {
      id: 'postcode',
      description: 'Postcode',
    },
    {
      id: 'id',
      description: 'Add',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return (
          <Button
            type="button"
            variant="secondary"
            icon="plus"
            textHidden
            size="small"
            disabled={!selectEnabled}
            onClick={selectFunction}
            dataValue={row.id}
          >
            Select
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    let count = 1;
    if (customerList && customerList.length > 0) count = customerList[0]?.pageCount || 1;
    setPageCount(count);
  }, [customerList]);

  return (
    <Section
      title="Existing Clients"
      mb={6}
      headerChildren={
        <div className="c-search-add">
          {!showAddClient && <InputSearch id="search-clients" onKeyUp={handleKey} />}
          <div>
            <Button
              type="button"
              variant="secondary"
              icon={showAddClient ? 'close' : 'plus'}
              iconPosition="left"
              onClick={() => toggleShowAddClient(!showAddClient)}
            >
              {showAddClient ? 'Close' : 'Add new Client'}
            </Button>
          </div>
        </div>
      }
    >
      {showAddClient && (
        <div className="u-mb-6">
          <AddClient titles={formTitles} handleCancel={toggleShowAddClient} fetchCustomers={fetchCustomers} />
        </div>
      )}

      <Grid
        rowData={customerList}
        columns={columns}
        pageSize={pageSize}
        maxPage={pageCount}
        gotoPage={pageFunction}
        sortRows={sortFunction}
        noRowsMessage={<NoGridData image="no-clients" message="You currently have no clients" />}
        pinned="right"
        disablePaging={true}
        showHeaders={customerList && customerList.length > 0}
        defaultSortColumn="id"
        defaultDirection="Desc"
      />
    </Section>
  );
};
