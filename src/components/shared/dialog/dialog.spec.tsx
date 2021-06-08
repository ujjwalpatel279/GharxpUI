import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Dialog } from './dialog';

describe('Dialog Component', () => {
  afterEach(cleanup);

  test('Shows correct message & buttons', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Dialog show={true} handleClose={() => null} message={'Test Message'} submit={() => null} />
      </BrowserRouter>,
    );

    expect(getByText('No')).toBeInTheDocument();
    expect(getByText('Yes')).toBeInTheDocument();
    expect(getByText('Test Message')).toBeInTheDocument();
  });
});
