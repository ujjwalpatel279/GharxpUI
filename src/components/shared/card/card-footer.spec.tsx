import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CardFooter } from './card-footer';

describe('shows card footer', () => {
  afterEach(cleanup);

  it('inserts text in div', () => {
    const { getByText } = render(
      <CardFooter>
        <div className={'test-class'}>something</div>
      </CardFooter>,
    );

    expect(getByText('something')).toHaveClass('test-class');
  });
});
