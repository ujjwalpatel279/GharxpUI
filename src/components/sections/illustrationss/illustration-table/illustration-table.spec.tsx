import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { IllustrationTable } from './illustration-table';

describe('Illustration Component', () => {
  afterEach(cleanup);

  it('renders the illustration component', () => {
    const { container } = render(<IllustrationTable esisSummary={[]} editPage={''}></IllustrationTable>);
    expect(container).toMatchSnapshot();
  });
});
