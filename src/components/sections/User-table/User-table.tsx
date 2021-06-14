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
  // deleteDocument: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  selectFunction: (e: MouseEvent<HTMLButtonElement>) => void;
  selectEnabled: boolean;
  UserList: UserInterface[];
  formTitles: TitleInterface[];
  handleKey: (e: KeyboardEvent<HTMLInputElement>) => void;
  pageFunction?: (pageNumber: number, pageSize: number) => Promise<GridRow[]>;
  sortFunction?: (column: GridColumn, order: string) => Promise<GridRow[]>;
  handleClick: (e: MouseEvent<HTMLInputElement>) => void;
  fetchClients?: (searchTerm: string) => void;

}

export const UserTable: FunctionComponent<UserTableInterface> = ({
  //  deleteDocument,
  selectFunction,
  selectEnabled,
  UserList,
  formTitles,
  handleKey,
  pageFunction,
  sortFunction,
  handleClick,
  fetchClients

}): ReactElement => {
  const [showAddClient, toggleShowAddClient] = useState(false);
  const [forceUpdateCount, setForceUpdateCount] = useState(0);
  const forceUpdate = () => setForceUpdateCount((forceUpdateCount) => forceUpdateCount + 1);

  // const deleteDoc: (e: MouseEvent<HTMLButtonElement>) => void = (e) => {
  //   deleteDocument(e).then(() => {
  //     forceUpdate();
  //   });
  // };
  // const [pageCount, setPageCount] = useState(1);

  const Columns: GridColumn[] = [
    {
      id: 'id', description: 'Id', sort: false,
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
          </Button>);
      },
    },
    { id: 'name', description: 'name', },
    { id: 'contactNo', description: 'contactNo' },
    { id: 'areaName', description: 'AreaName' },
    { id: 'pincode', description: 'Pincode' },
    { id: 'emailId', description: 'EmailId' },
    { id: 'city', description: 'City' },
    { id: 'state', description: 'State' },

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

            <Button type="submit" variant="primary" childClasses="u-mr-2">
              delete User
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
