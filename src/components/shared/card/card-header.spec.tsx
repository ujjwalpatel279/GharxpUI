import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CardHeader } from './card-header';

describe('shows card header', () => {
  afterEach(cleanup);

  it('inserts text in div', () => {
    const { getByText } = render(
      <CardHeader>
        <div className="test-class">something</div>
      </CardHeader>,
    );

    expect(getByText('something')).toHaveClass('test-class');
  });
});
