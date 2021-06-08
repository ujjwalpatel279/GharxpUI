import React, { ChangeEvent, FunctionComponent, useEffect, useState, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import { Grid, Button } from '../../shared';
import { GridColumn, GridRow } from 'components/shared/grid/grid';
import { UserInterface } from 'shared/models';
import { AddClient } from '../add-client/add-client';
import { TitleInterface } from '../../../shared/models';
import { AddUser } from '../add-user/add-user';
import { Section, FilterSelect, InputSearch } from '../../shared';

import './User-table.scss';

interface UserTableInterface {
  UserList: UserInterface[];
  formTitles: TitleInterface[];
  handleKey: (e: KeyboardEvent<HTMLInputElement>) => void;
  pageFunction?: (pageNumber: number, pageSize: number) => Promise<GridRow[]>;
  sortFunction?: (column: GridColumn, order: string) => Promise<GridRow[]>;
  handleClick: (e: MouseEvent<HTMLInputElement>) => void;
  fetchClients?: (searchTerm: string) => void;

}

export const UserTable: FunctionComponent<UserTableInterface> = ({
  UserList,
  formTitles,
  handleKey,
  pageFunction,
  sortFunction,
  handleClick,
  fetchClients
}): ReactElement => {
  const [showAddClient, toggleShowAddClient] = useState(false);

  // const [pageCount, setPageCount] = useState(1);

  const Columns: GridColumn[] = [

    { id: 'name', description: 'name', },
    { id: 'contactNo', description: 'contactNo' },

  ];

  useEffect(() => {
    let count = 1;
    //if (UserList && UserList.length > 0) count = UserList[0]?.pageCount || 1;
    // setPageCount(count);
  }, [UserList]);

  return (
    <Section
      title="User Table"
      headerChildren={
        // <div><Button type="button" variant="primary" onClick={handleClick}>Click Me</Button></div>
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
              {showAddClient ? 'Close' : 'New User'}
            </Button>
          </div>
        </div>
      }
    >
      {showAddClient && (
        <div className="u-mb-6">
          <AddUser title={formTitles} handleCancel={toggleShowAddClient} />
          {/* fetchCustomers={fetchClients} */}
        </div>
      )}
      {!showAddClient && (
        <Grid
          pageSize={10}
          rowData={UserList}
          columns={Columns}
          //maxPage={pageCount}
          gotoPage={pageFunction}
          sortRows={sortFunction}
          extendClass="c-User-table"
          noRowsMessage="No User Currently available"
          defaultSortColumn="description"
          defaultDirection="Asc"
        />
      )}
    </Section>
  );
};
