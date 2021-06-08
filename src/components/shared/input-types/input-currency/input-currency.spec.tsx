import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { InputCurrency } from './input-currency';

describe('Input Currency Component', () => {
  afterEach(cleanup);

  it('renders the currency component', () => {
    const { container } = render(<InputCurrency id="amount" required={false} ref={() => null} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('aria-invalid is false', () => {
    const { queryByPlaceholderText } = render(
      <InputCurrency id="amount" error={false} placeHolder="testInput" required={false} ref={() => null} />,
    );

    expect(queryByPlaceholderText('testInput').getAttribute('aria-invalid')).toBe('false');
  });

  it('aria-invalid is true', () => {
    const { queryByPlaceholderText } = render(
      <InputCurrency id="amount" error={true} placeHolder="testInput" required={false} ref={() => null} />,
    );

    expect(queryByPlaceholderText('testInput').getAttribute('aria-invalid')).toBe('true');
  });

  it('input value is initially empty and has a value once a value is entered', () => {
    const { queryByPlaceholderText } = render(
      <InputCurrency id="amount" error={true} placeHolder="testInput" required={false} ref={() => null} />,
    );

    const input = queryByPlaceholderText('testInput') as HTMLInputElement;
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: '1234' } });
    expect(input.value).toBe('1234');
  });
});
