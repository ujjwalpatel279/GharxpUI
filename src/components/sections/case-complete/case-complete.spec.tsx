import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CompleteCase } from './case-complete';

describe('Upload Document Component', () => {
  afterEach(cleanup);

  test('Shows correct society name & buttons', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CompleteCase show={true} handleClose={() => null} societyName={'My Society'} />
      </BrowserRouter>,
    );

    expect(getByText('No')).toBeInTheDocument();
    expect(getByText('Yes')).toBeInTheDocument();
    expect(getByText('Submit case to My Society?')).toBeInTheDocument();
  });
});
