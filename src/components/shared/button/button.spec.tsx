import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Button } from './button';

describe('Button Component', () => {
  afterEach(cleanup);

  it('renders the primary button', () => {
    const { container } = render(
      <Button type="button" variant="primary">
        Primary Button
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the primary button small', () => {
    const { container } = render(
      <Button type="button" variant="primary" size="small">
        Primary Button Small
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the primary button large', () => {
    const { container } = render(
      <Button type="button" variant="primary" size="large">
        Primary Button Large
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the secondary button', () => {
    const { container } = render(
      <Button type="button" variant="secondary">
        Secondary Button
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the secondary button Small', () => {
    const { container } = render(
      <Button type="button" variant="secondary" size="small">
        Secondary Button Small
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the secondary button large', () => {
    const { container } = render(
      <Button type="button" variant="secondary" size="large">
        Secondary Button Large
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the primary button navy', () => {
    const { container } = render(
      <Button type="button" variant="navy">
        Button Navy
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a disabled button', () => {
    const { container } = render(
      <Button type="button" variant="primary" disabled>
        Button Disabled
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a full width button', () => {
    const { container } = render(
      <Button type="button" variant="primary" width="full">
        Button Full Width
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
