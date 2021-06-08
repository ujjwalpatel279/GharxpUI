import React, { FunctionComponent, ReactElement, useEffect, useState, KeyboardEvent, MouseEvent } from 'react';

import { Grid, InputSearch, Section } from '../../shared';
import { GridColumn, GridRow } from '../../shared/grid/grid';
import { Button } from '../../shared/button/button';
import { AddClient } from '../add-client/add-client';

import { TitleInterface } from '../../../shared/models';

import { CustomerInterface } from '../customer/customer.model';
import { NoGridData } from '../../../components/shared/grid-no-data/no-grid-data';

interface ClientDashboardInterface {
  clientList: CustomerInterface[];
  pageSize: number;
  formTitles: TitleInterface[];
  pageFunction?: (pageNumber: number, pageSize: number) => Promise<GridRow[]>;
  sortFunction?: (column: GridColumn, order: string) => Promise<GridRow[]>;
  handleKey: (e: KeyboardEvent<HTMLInputElement>) => void;
  getRowId?: (rowId: number) => void;
  fetchClients?: (searchTerm: string) => void;
}

export const ClientDashboard: FunctionComponent<ClientDashboardInterface> = ({
  clientList,
  pageSize,
  formTitles,
  pageFunction,
  sortFunction,
  handleKey,
  getRowId,
  fetchClients,
}): ReactElement => {
  const [showAddClient, toggleShowAddClient] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const columns = [
    {
      id: 'id',
      description: 'Id',
      hidden: true,
    },
    {
      id: 'title',
      description: 'Title',
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
      description: 'Date of birth',
      render(column: GridColumn, row: GridRow) {
        const date: Date = new Date(Date.parse(row[column.id] ?? Date.now));
        return (
          <>
            <span>{date.toLocaleDateString()}</span>
          </>
        );
      },
    },
    {
      id: 'email',
      description: 'Email',
    },
    {
      id: 'mobileNumber',
      description: 'Telephone',
    },
  ];

  useEffect(() => {
    let count = 1;
    if (clientList && clientList.length > 0) count = clientList[0]?.pageCount || 1;
    setPageCount(count);
  }, [clientList]);

  return (
    <Section
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
              {showAddClient ? 'Close' : 'New Client'}
            </Button>
          </div>
        </div>
      }
    >
      {showAddClient && (
        <div className="u-mb-6">
          <AddClient titles={formTitles} handleCancel={toggleShowAddClient} fetchCustomers={fetchClients} />
        </div>
      )}

      <Grid
        rowData={clientList}
        columns={columns}
        pageSize={pageSize}
        selectRow={(row) => getRowId(row.id)}
        maxPage={pageCount}
        gotoPage={pageFunction}
        sortRows={sortFunction}
        noRowsMessage={<NoGridData image="no-clients" message="You currently have no clients" />}
        showHeaders={clientList && clientList.length > 0}
        disablePaging={false}
        defaultSortColumn="id"
        defaultDirection="Desc"
      />
    </Section>
  );
};
