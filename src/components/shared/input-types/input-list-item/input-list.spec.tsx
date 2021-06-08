import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { InputListItem } from './input-list-item';

describe('Input List Item Component', () => {
  afterEach(cleanup);

  it('renders the component', () => {
    const { container } = render(
      <InputListItem type="radio" name="inputName" value="inputValue" id="inputList" ref={() => null} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
