import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Icon } from './icon';

describe('Container Component', () => {
  afterEach(cleanup);

  it('renders an icon', () => {
    const { container } = render(<Icon name="close" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders an icon with the primary colour', () => {
    const { container } = render(<Icon name="close" colour="primary" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders an icon with the secondary colour', () => {
    const { container } = render(<Icon name="close" colour="secondary" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a small icon', () => {
    const { container } = render(<Icon name="close" size="small" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a large icon', () => {
    const { container } = render(<Icon name="close" size="large" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
