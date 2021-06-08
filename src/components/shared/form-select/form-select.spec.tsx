import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { FormSelect } from './form-select';

const mockOptions = [
  {
    id: 1,
    value: 'One',
  },
  {
    id: 2,
    value: 'Two',
  },
];

describe('FormInput Component', () => {
  afterEach(cleanup);

  it('renders the form select component', () => {
    const { container } = render(<FormSelect id="testSelect" options={mockOptions} ref={() => null} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('aria-invalid is false', () => {
    const { getByTestId } = render(<FormSelect id="testSelect" options={mockOptions} error={false} ref={() => null} />);

    expect(getByTestId('form-select').getAttribute('aria-invalid')).toBe('false');
  });

  it('aria-invalid is true', () => {
    const { getByTestId } = render(<FormSelect id="testSelect" options={mockOptions} error={true} ref={() => null} />);

    expect(getByTestId('form-select').getAttribute('aria-invalid')).toBe('true');
  });

  it('first option is "Please select"', () => {
    const { getByTestId } = render(<FormSelect id="testSelect" options={mockOptions} ref={() => null} />);

    const select = getByTestId('form-select') as HTMLInputElement;
    expect(select.value).toBe('');
  });
});
