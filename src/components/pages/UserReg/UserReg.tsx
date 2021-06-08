import React, { FunctionComponent, ReactElement, useState, KeyboardEvent, MouseEvent,useEffect} from 'react';

import { Container } from '../../shared';
import { GridColumn } from '../../shared/grid/grid';
import {AddClient } from '../../sections/add-client/add-client';
import { PageHeading } from '../../shared';
import { UserInterface } from '../../../shared/models';
import { UserTable } from '../../sections/User-table/User-table';
import { services } from '../../../shared/api/services';
import { TitleInterface } from '../../../shared/models';


export const UserRegPage: FunctionComponent = (): ReactElement => {
  const [keyPressed, setKeyPressed] = useState<string | null>(' ');
  const [user, setUser] = useState<UserInterface[]>([]);
  const [formTitles, setAddClientTitles] = useState<TitleInterface[] | []>([]);
  const [sortColumn, setSortColumn] = useState<string>('Description');
  const [sortOrder, setSortOrder] = useState<string>('Asc');
  
  const pageSize = 10;

  const handleKey: (event: KeyboardEvent<HTMLInputElement>) => void = (e) => {
    console.log('hi');
  };

  const handleClick: (event: MouseEvent<HTMLInputElement>) => void = (e) =>{
    console.log('Clicke me button called.');
  }

  const getUser = async () =>{
    // const users = await services.getUser();
    // setUser(users.data);
    setUser((await services.getUser()).data);

  }

  

  const userData: UserInterface[] = [
    {
    //pageCount:10,
    contactNo:'2121231231',
    name:'Ujjwal'
    },
    {
     // pageCount:10,
      contactNo:'2121231231',
      name:'Nirmal'
    },
]

useEffect(() => {
  getUser();
 
}, [user])

  return (
    <section>
    <PageHeading headingLevel={2} title="User"  />
    <Container fullWidth>
      <UserTable
        UserList={user}
        handleKey={handleKey}
        handleClick={handleClick}
        formTitles={formTitles}

      />
    </Container>
  </section>
  )
};
