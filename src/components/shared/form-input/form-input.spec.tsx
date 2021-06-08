import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { FormInput } from './form-input';

describe('FormInput Component', () => {
  afterEach(cleanup);

  it('renders the form input component', () => {
    const { container } = render(<FormInput id="firstName" ref={() => null} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('aria-invalid is false', () => {
    const { queryByPlaceholderText } = render(
      <FormInput id="firstName" error={false} placeHolder="testInput" ref={() => null} />,
    );

    expect(queryByPlaceholderText('testInput').getAttribute('aria-invalid')).toBe('false');
  });

  it('aria-invalid is true', () => {
    const { queryByPlaceholderText } = render(
      <FormInput id="firstName" error={true} placeHolder="testInput" ref={() => null} />,
    );

    expect(queryByPlaceholderText('testInput').getAttribute('aria-invalid')).toBe('true');
  });

  it('input value is initially empty and has a value once a value is entered', () => {
    const { queryByPlaceholderText } = render(
      <FormInput id="firstName" error={true} placeHolder="testInput" ref={() => null} />,
    );

    const input = queryByPlaceholderText('testInput') as HTMLInputElement;
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: 'Rafael' } });
    expect(input.value).toBe('Rafael');
  });
});
