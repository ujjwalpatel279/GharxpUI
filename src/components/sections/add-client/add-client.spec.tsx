import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AddClient } from './add-client';

const mockTitles = [
  {
    id: '1',
    value: 'Mr',
  },
  {
    id: '2',
    value: 'Mrs',
  },
];

describe('AddClient Component', () => {
  afterEach(cleanup);

  test('Shows correct form text', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AddClient titles={mockTitles} handleCancel={() => null} />
      </BrowserRouter>,
    );

    expect(getByText('Add a new client')).toBeInTheDocument();
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('First name')).toBeInTheDocument();
    expect(getByText('Last name')).toBeInTheDocument();
    expect(getByText('Date of birth')).toBeInTheDocument();
    expect(getByText('Email address')).toBeInTheDocument();
    expect(getByText('Contact number')).toBeInTheDocument();
    expect(getByText('Add new client')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
