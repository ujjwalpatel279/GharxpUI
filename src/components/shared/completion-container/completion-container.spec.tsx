import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { CompletionContainer } from './completion-container';

describe('Completion Container Component', () => {
  afterEach(cleanup);

  it('renders the completion container', () => {
    const { container } = render(
      <CompletionContainer heading="Test heading" text="Test text">
        <p>I am a child</p>
      </CompletionContainer>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correct heading and text', () => {
    const { getByText } = render(
      <CompletionContainer heading="Test heading" text="Test text">
        <p>I am a child</p>
      </CompletionContainer>,
    );
    expect(getByText('Test heading')).toBeInTheDocument();
    expect(getByText('Test text')).toBeInTheDocument();
    expect(getByText('I am a child')).toBeInTheDocument();
  });
});
