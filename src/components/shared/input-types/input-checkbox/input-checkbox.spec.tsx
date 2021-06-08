import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { InputCheckbox } from './input-checkbox';

describe('Input checkbox Component', () => {
  afterEach(cleanup);

  it('renders the checkbox component', () => {
    const { container } = render(<InputCheckbox id="inputCheckbox" ref={() => null} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
