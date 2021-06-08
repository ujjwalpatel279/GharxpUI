import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Card } from './index';

describe('shows card ', () => {
  afterEach(cleanup);

  it('inserts text in div', () => {
    const { getByText } = render(
      <Card>
        <div className={'test-class'}>something</div>
      </Card>,
    );

    expect(getByText('something')).toHaveClass('test-class');
  });
});
