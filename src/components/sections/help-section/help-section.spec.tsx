import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { HelpSection } from './help-section';

const helpPageProps = {
  content: `Lorem ipsum **bold text** _italic_`,
  broker: 'test broker',
  version: '0.0.0',
};

describe('Help page', () => {
  afterEach(cleanup);
  it('show the help text', () => {
    const { getByText } = render(<HelpSection {...helpPageProps} />);
    expect(getByText('Lorem ipsum')).toBeTruthy();
    expect(getByText(`${helpPageProps.broker} ${helpPageProps.version}`)).toBeTruthy();
  });
});
