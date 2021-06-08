import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Heading } from './heading';

describe('Container Component', () => {
  afterEach(cleanup);

  it('renders the level 1 heading', () => {
    const { container } = render(<Heading level="h1" title="Heading Level 1" />);

    const headingLevel = container.querySelector('h1');

    expect(container.firstChild).toMatchSnapshot();
    expect(headingLevel).toBeInTheDocument();
  });

  it('renders the level 2 heading', () => {
    const { container } = render(<Heading level="h2" title="Heading Level 2" />);

    const headingLevel = container.querySelector('h2');

    expect(container.firstChild).toMatchSnapshot();
    expect(headingLevel).toBeInTheDocument();
  });

  it('renders the level 3 heading', () => {
    const { container } = render(<Heading level="h3" title="Heading Level 3" />);

    const headingLevel = container.querySelector('h3');

    expect(container.firstChild).toMatchSnapshot();
    expect(headingLevel).toBeInTheDocument();
  });
});
