import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Section } from './section';

describe('Section Component', () => {
  afterEach(cleanup);

  it('renders the section component', () => {
    const { container } = render(<Section title="Section">Container Component</Section>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
