import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Nav } from './nav';
import { services } from '../../../../shared/api/services';
import { ModuleTextInterface } from 'shared/models';

import { ServiceHandlingInterface } from '../../../../shared/types/service-handling';

describe('Nav Component', () => {
  afterEach(cleanup);

  const mockModText: ModuleTextInterface = {
    textId: 1,
    sectionId: 2,
    description: '/lending-criteria',
    title: '',
    placeholder: '',
    code: 'lendcrit',
    lastUpdateDate: Date.now().toString(),
  };

  const getModuleText = jest.spyOn(services, 'getModuleText').mockImplementation(
    (code: string): Promise<ServiceHandlingInterface<ModuleTextInterface>> =>
      new Promise((resolve) => {
        resolve({ data: mockModText, loading: false, error: false });
      }),
  );

  test('Shows correct nav links', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Nav visible={false} toggleVisible={() => null} />
      </BrowserRouter>,
    );

    expect(getByText('Cases')).toBeInTheDocument();
    expect(getByText('Clients')).toBeInTheDocument();
    expect(getByText('Products')).toBeInTheDocument();
  });

  test('Routes to the /Cases page', async () => {
    const { getByText, findAllByText } = render(
      <BrowserRouter>
        <Nav visible={false} toggleVisible={() => null} />
        <Route path="/cases">Cases</Route>
      </BrowserRouter>,
    );

    fireEvent.click(getByText('Cases'));

    const items = await findAllByText('Cases');
    expect(items).toHaveLength(2);
  });

  test('Routes to the /clients page', async () => {
    const { getByText, findAllByText } = render(
      <BrowserRouter>
        <Nav visible={false} toggleVisible={() => null} />
        <Route path="/clients">Clients</Route>
      </BrowserRouter>,
    );

    fireEvent.click(getByText('Clients'));

    const items = await findAllByText('Clients');
    expect(items).toHaveLength(2);
  });

  test('Routes to the /products page', async () => {
    const { getByText, findAllByText } = render(
      <BrowserRouter>
        <Nav visible={false} toggleVisible={() => null} />
        <Route path="/products">Products</Route>
      </BrowserRouter>,
    );

    fireEvent.click(getByText('Products'));

    const items = await findAllByText('Products');
    expect(items).toHaveLength(2);
  });

  test('Routes to the /lending-criteria page', async () => {
    const { findAllByText, findByText } = render(
      <BrowserRouter>
        <Nav visible={false} toggleVisible={() => null} />
        <Route path="/lending-criteria">Lending Criteria</Route>
      </BrowserRouter>,
    );
    const button = await findByText('Lending Criteria');
    fireEvent.click(button);

    const items = await findAllByText('Lending Criteria');
    expect(items).toHaveLength(1);
    expect(getModuleText).toBeCalled();
  });
});
