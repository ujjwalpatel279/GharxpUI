import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './header';

describe('Header Component', () => {
  afterEach(cleanup);

  test('Shows correct text', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header firstName="Rupert" lastName="Jones" />
      </BrowserRouter>,
    );

    expect(getByText('RJ')).toBeInTheDocument();
    expect(getByText('Show Site Navigation')).toBeInTheDocument();
    expect(getByText('Show User Menu')).toBeInTheDocument();
  });

  test('Toggles the site navigation', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header firstName="Rupert" lastName="Jones" />
      </BrowserRouter>,
    );

    const btnShow = getByText('Show Site Navigation');
    expect(btnShow).toBeInTheDocument();

    fireEvent.click(btnShow);

    const btnHide = getByText('Hide Site Navigation');
    expect(btnHide).toBeInTheDocument();

    fireEvent.click(btnHide);

    expect(btnShow).toBeInTheDocument();
  });

  test('toggles the user menu', () => {
    const { getByText, queryByText } = render(
      <BrowserRouter>
        <Header firstName="Rupert" lastName="Jones" />
      </BrowserRouter>,
    );

    const btnShow = getByText('Show User Menu');
    expect(btnShow).toBeInTheDocument();

    expect(queryByText('Rupert Jones')).toBeInTheDocument();

    fireEvent.click(btnShow);

    expect(queryByText('RJ')).toBeInTheDocument();
    expect(queryByText('Maintenance')).toBeInTheDocument();
    expect(queryByText('Settings')).toBeInTheDocument();
    expect(queryByText('Help')).toBeInTheDocument();
    expect(queryByText('Log out')).toBeInTheDocument();

    fireEvent.click(btnShow);
  });
});
