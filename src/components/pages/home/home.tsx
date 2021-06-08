import React, { FunctionComponent, ReactElement, useState} from 'react';

import { Container } from '../../shared';
import {AddClient } from '../../sections/add-client/add-client';

import { Intro } from './intro/intro';

export const HomePage: FunctionComponent = (): ReactElement => {
  const [showAddClient, toggleShowAddClient] = useState(false);

  return (
    <Container>
      <Intro />
      <AddClient titles={[]} handleCancel={() => toggleShowAddClient(!showAddClient)}/>
    </Container>
  )
};
