import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { InputSelect } from './input-select';

const mockOptions = [
  {
    id: '1',
    value: 'One',
  },
  {
    id: '2',
    value: 'Two',
  },
];

describe('FormInput Component', () => {
  afterEach(cleanup);

  it('renders the form select component', () => {
    const { container } = render(
      <InputSelect id="testSelect" required={false} options={mockOptions} ref={() => null} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('aria-invalid is false', () => {
    const { getByTestId } = render(
      <InputSelect id="testSelect" options={mockOptions} required={false} error={false} ref={() => null} />,
    );

    expect(getByTestId('input-select').getAttribute('aria-invalid')).toBe('false');
  });

  it('aria-invalid is true', () => {
    const { getByTestId } = render(
      <InputSelect id="testSelect" options={mockOptions} required={false} error={true} ref={() => null} />,
    );

    expect(getByTestId('input-select').getAttribute('aria-invalid')).toBe('true');
  });

  it('first option is "Please select"', () => {
    const { getByTestId } = render(
      <InputSelect id="testSelect" forceSelection={true} required={false} options={mockOptions} ref={() => null} />,
    );

    const select = getByTestId('input-select') as HTMLInputElement;
    expect(select.value).toBe('');
  });

  it('first option is "One"', () => {
    const { getByTestId } = render(
      <InputSelect id="testSelect" required={false} options={mockOptions} ref={() => null} />,
    );

    const select = getByTestId('input-select') as HTMLInputElement;
    expect(select.value).toBe('1');
  });
});
