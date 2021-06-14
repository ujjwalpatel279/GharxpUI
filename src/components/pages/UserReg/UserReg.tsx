import React, { FunctionComponent, ReactElement, useState, KeyboardEvent, MouseEvent, useEffect } from 'react';

import { Container } from '../../shared';
import { GridColumn } from '../../shared/grid/grid';
import { AddClient } from '../../sections/add-client/add-client';
import { PageHeading, Dialog } from '../../shared';
import { UserInterface } from '../../../shared/models';
import { UserTable } from '../../sections/User-table/User-table';
import { services } from '../../../shared/api/services';
import { TitleInterface } from '../../../shared/models';
import { AddUser } from '../../sections/add-user/add-user';


export const UserRegPage: FunctionComponent = (): ReactElement => {
  const [keyPressed, setKeyPressed] = useState<string | null>(' ');
  const [user, setUser] = useState<UserInterface[]>([]);
  const [activeClient, setActiveClient] = useState<UserInterface | null>(null);
  const [showAddUser, toggleShowAddClient] = useState(false);
  const [users, GetId] = useState(4);
  const [formTitles, setAddClientTitles] = useState<TitleInterface[] | []>([]);
  const [sortColumn, setSortColumn] = useState<string>('Description');
  const [sortOrder, setSortOrder] = useState<string>('Asc');

  const pageSize = 10;

  const handleKey: (event: KeyboardEvent<HTMLInputElement>) => void = (e) => {
    console.log('hi');
  };

  const handleClick: (event: MouseEvent<HTMLInputElement>) => void = (e) => {
    console.log('Clicke me button called.');
    const id = 4;
    console.log(id);
    // const getid = async () => {
    //   GetId(await services.deleteUser(id));
    // }
  }
  // const getid = async () => {
  //   GetId(await services.deleteUser(id));
  // }
  // useEffect(() => {
  //   getid();
  // }, [users])

  const getUser = async () => {
    setUser((await services.getUser()).data);
  }
  console.log(getUser);
  useEffect(() => {
    getUser();
  }, [user])
  console.log(user);

  // const deleteDocument: (e: MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
  //   if (window.confirm('Are you sure you wish to delete this document?')) {
  //     const id = Number(e.currentTarget.getAttribute('data-value'));
  //     console.log(id);
  //     await services.deleteUser(id);
  //     //loadDocumentGrid(id);
  //   }
  // };


  const handleRemoveClient: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async () => {
    const clientId = Number(activeClient.id);
    await services.deleteUser(clientId);

    console.log(clientId);

  };

  return (
    <>
      {/* <Dialog
        message="Are you sure you want to remove this client?"
        //  show={modalVisible}
        // handleClose={hideModal}
        submit={handleRemoveClient}
      ></Dialog> */}

      <PageHeading headingLevel={2} title="User" />
      <Container fullWidth>
        <UserTable
          UserList={user}
          handleKey={handleKey}
          handleClick={handleClick}
          formTitles={formTitles}
          // deleteDocument={deleteDocument}
          selectFunction={handleRemoveClient}
          selectEnabled={true}

        />
      </Container>
    </>
  )
};
