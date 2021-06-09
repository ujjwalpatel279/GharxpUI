import React, { FunctionComponent, ReactElement, useState, KeyboardEvent, MouseEvent, useEffect } from 'react';

import { Container } from '../../shared';
import { GridColumn } from '../../shared/grid/grid';
import { AddClient } from '../../sections/add-client/add-client';
import { PageHeading } from '../../shared';
import { UserInterface } from '../../../shared/models';
import { UserTable } from '../../sections/User-table/User-table';
import { services } from '../../../shared/api/services';
import { TitleInterface } from '../../../shared/models';
import { AddUser } from '../../sections/add-user/add-user';


export const UserRegPage: FunctionComponent = (): ReactElement => {
  const [keyPressed, setKeyPressed] = useState<string | null>(' ');
  const [user, setUser] = useState<UserInterface[]>([]);
  const [showAddUser, toggleShowAddClient] = useState(false);

  const [formTitles, setAddClientTitles] = useState<TitleInterface[] | []>([]);
  const [sortColumn, setSortColumn] = useState<string>('Description');
  const [sortOrder, setSortOrder] = useState<string>('Asc');

  const pageSize = 10;

  const handleKey: (event: KeyboardEvent<HTMLInputElement>) => void = (e) => {
    console.log('hi');
  };

  const handleClick: (event: MouseEvent<HTMLInputElement>) => void = (e) => {
    console.log('Clicke me button called.');
  }

  const getUser = async () => {
    setUser((await services.getUser()).data);
  }

  useEffect(() => {
    getUser();
  }, [user])

  return (
    <>
      <PageHeading headingLevel={2} title="User" />
      <Container fullWidth>
        <AddUser title={[]} handleCancel={() => toggleShowAddClient(!showAddUser)} />

        <UserTable
          UserList={user}
          handleKey={handleKey}
          handleClick={handleClick}
          formTitles={formTitles}
        />
      </Container>
    </>
  )
};
