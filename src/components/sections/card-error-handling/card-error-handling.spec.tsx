import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CardErrorHandling } from './card-error-handling';

describe('shows card bad redirects', () => {
  afterEach(cleanup);
  it('show bad redirects information on card', () => {
    const { container } = render(<CardErrorHandling />);
    expect(container).toMatchSnapshot();
  });
});
