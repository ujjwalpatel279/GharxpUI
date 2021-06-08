import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CardErrorHandlingHeader } from './card-error-handling-header';

describe('shows card bad redirects header', () => {
  afterEach(cleanup);
  it('show bad redirects card header', () => {
    const { asFragment } = render(<CardErrorHandlingHeader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
