import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { InputDob } from './input-dob';

describe('Input DOB Component', () => {
  afterEach(cleanup);

  const mock = jest.fn();

  it('renders the DOB component', () => {
    const { container } = render(<InputDob register={mock} required={true} name="dob" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
