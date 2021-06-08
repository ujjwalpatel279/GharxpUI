import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { Input } from './input';

describe('Input Component', () => {
  afterEach(cleanup);

  it('renders the form input component', () => {
    const { container } = render(<Input id="firstName" required={false} ref={() => null} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('aria-invalid is false', () => {
    const { queryByPlaceholderText } = render(
      <Input id="firstName" error={false} placeHolder="testInput" required={false} ref={() => null} />,
    );

    expect(queryByPlaceholderText('testInput').getAttribute('aria-invalid')).toBe('false');
  });

  it('aria-invalid is true', () => {
    const { queryByPlaceholderText } = render(
      <Input id="firstName" error={true} placeHolder="testInput" required={false} ref={() => null} />,
    );

    expect(queryByPlaceholderText('testInput').getAttribute('aria-invalid')).toBe('true');
  });

  it('input value is initially empty and has a value once a value is entered', () => {
    const { queryByPlaceholderText } = render(
      <Input id="firstName" error={true} placeHolder="testInput" required={false} ref={() => null} />,
    );

    const input = queryByPlaceholderText('testInput') as HTMLInputElement;
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: 'Rafael' } });
    expect(input.value).toBe('Rafael');
  });
});
