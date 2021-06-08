import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { InputSearch } from './input-search';

describe('Input Search Component', () => {
  afterEach(cleanup);

  it('renders the search component', () => {
    const { container } = render(<InputSearch id="amount" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('input value is initially empty and has a value once a value is entered', () => {
    const { queryByPlaceholderText } = render(<InputSearch id="search" />);

    const input = queryByPlaceholderText('Search') as HTMLInputElement;
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: 'Search' } });
    expect(input.value).toBe('Search');
  });
});
