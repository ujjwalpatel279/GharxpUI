import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Column } from './';

describe('shows card body', () => {
  afterEach(cleanup);

  it('inserts text in div', () => {
    const { getByText } = render(
      <Column>
        <div className={'test-class'}>something</div>
      </Column>,
    );
    expect(getByText('something')).toBeTruthy();
  });
});
