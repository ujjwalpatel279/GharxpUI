import React from 'react';

import { NoGridData } from './no-grid-data';

import { render, cleanup } from '@testing-library/react';

describe('No Grid Data Component', () => {
  afterEach(cleanup);
  it('renders the no grid data component', () => {
    const { container } = render(<NoGridData image="no-clients" message="" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the no grid data message', () => {
    const message = 'there are no clients';
    const { getByText } = render(<NoGridData image="no-clients" message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });
});
