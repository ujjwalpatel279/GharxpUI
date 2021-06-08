import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { InputBool } from './input-bool';

describe('Input Bool Component', () => {
  afterEach(cleanup);

  it('renders the bool component', () => {
    const { container } = render(<InputBool name="inputbool" legend="Bool legend" ref={() => null} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
