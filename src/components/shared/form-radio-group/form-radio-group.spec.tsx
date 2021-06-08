import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { FormRadioGroup } from './form-radio-group';

describe('FormRadioGroup Component', () => {
  afterEach(cleanup);

  it('renders the form radio group component', () => {
    const { container } = render(
      <FormRadioGroup name="testName" attributes={[{ id: 1, value: 'test' }]} ref={() => null} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
