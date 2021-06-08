import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CardErrorHandlingFooter } from './card-error-handling-footer';

describe('shows card bad redirects footer', () => {
  afterEach(cleanup);
  it('show bad redirects card footer', () => {
    const { asFragment } = render(<CardErrorHandlingFooter />);
    expect(asFragment()).toMatchSnapshot();
  });
});
