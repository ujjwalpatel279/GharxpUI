import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { FormField } from './form-field';

describe('FormField Component', () => {
  afterEach(cleanup);

  it('renders the form field component', () => {
    const { container } = render(<FormField label="testLabel">Form Field Component</FormField>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('error message is shown', () => {
    const { queryByText } = render(
      <FormField label="testLabel" error="Test error message">
        Form Field Component
      </FormField>,
    );
    expect(queryByText('Test error message')).toBeInTheDocument();
  });
});
