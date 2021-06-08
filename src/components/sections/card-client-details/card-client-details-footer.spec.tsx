import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { CardClientDetailsFooter } from './card-client-details-footer';

describe('shows card details footer', () => {
  afterEach(cleanup);
  it('render specific content in footer', async () => {
    const expanded = false;
    await waitFor(() => {
      const { getByText } = render(<CardClientDetailsFooter expanded={expanded} />);
      expect(getByText('See more')).toBeTruthy();
    });
  });
});
