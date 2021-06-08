import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { CardClientDownloadsHeader } from './card-client-downloads-header';

describe('shows document card header', () => {
  afterEach(cleanup);
  it('show document card header', () => {
    waitFor(() => {
      const { getByText } = render(<CardClientDownloadsHeader />);
      expect(getByText('Documents')).toBeTruthy();
    });
  });
});
