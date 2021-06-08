import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CardBody } from './card-body';

describe('shows card body', () => {
  afterEach(cleanup);

  it('inserts text in div', () => {
    const { getByText } = render(
      <CardBody>
        <div className={'test-class'}>something</div>
      </CardBody>,
    );

    expect(getByText('something')).toHaveClass('test-class');
  });
});
