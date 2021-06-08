import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CardErrorHandlingBody } from './card-error-handling-body';

describe('shows card bad redirects body', () => {
  afterEach(cleanup);
  it('show bad redirects information on card', () => {
    const { asFragment } = render(<CardErrorHandlingBody />);
    expect(asFragment()).toMatchSnapshot();
  });
});
