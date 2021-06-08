import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { InputRadio } from './input-radio';

describe('Renders the Radio Group Component', () => {
  afterEach(cleanup);

  it('renders the radio group component', () => {
    const { container } = render(
      <InputRadio name="testName" options={[{ id: '1', value: 'test' }]} legend="Radio legend" ref={() => null} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
