import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Container } from './container';

describe('Container Component', () => {
  afterEach(cleanup);

  it('renders the container', () => {
    const { container } = render(<Container>Container Component</Container>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
