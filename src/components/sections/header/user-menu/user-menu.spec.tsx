import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom';

import { UserMenu } from './user-menu';

describe('User Menu Component', () => {
  afterEach(cleanup);

  test('Routes to the /maintenance page', async () => {
    const { getByText, findAllByText } = render(
      <BrowserRouter>
        <UserMenu firstName="Rupert" lastName="Jones" userMenuVisible={true} toggleUserMenu={() => null} />
        <Route path="/maintenance">Maintenance</Route>
      </BrowserRouter>,
    );

    fireEvent.click(getByText('Maintenance'));

    const items = await findAllByText('Maintenance');
    expect(items).toHaveLength(2);
  });

  test('Routes to the /settings page', async () => {
    const { getByText, findAllByText } = render(
      <BrowserRouter>
        <UserMenu firstName="Rupert" lastName="Jones" userMenuVisible={true} toggleUserMenu={() => null} />
        <Route path="/settings">Settings</Route>
      </BrowserRouter>,
    );

    fireEvent.click(getByText('Settings'));

    const items = await findAllByText('Settings');
    expect(items).toHaveLength(2);
  });

  test('Routes to the /help page', async () => {
    const { getByText, findAllByText } = render(
      <BrowserRouter>
        <UserMenu firstName="Rupert" lastName="Jones" userMenuVisible={true} toggleUserMenu={() => null} />
        <Route path="/help">Help</Route>
      </BrowserRouter>,
    );

    fireEvent.click(getByText('Help'));

    const items = await findAllByText('Help');
    expect(items).toHaveLength(2);
  });
});
