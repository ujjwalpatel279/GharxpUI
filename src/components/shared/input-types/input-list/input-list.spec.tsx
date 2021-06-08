import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { InputList } from './input-list';

describe('Input List Component', () => {
  afterEach(cleanup);

  it('renders the component', () => {
    const { container } = render(
      <InputList
        id="inputList"
        legend="Input list"
        required={false}
        options={[{ id: '1', value: 'test' }]}
        ref={() => null}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
