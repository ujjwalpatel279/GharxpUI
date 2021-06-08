import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CardClientDownloadsFooter } from './card-client-downloads-footer';

const handleRefreshDocuments = jest.fn();
const handleExpanded = jest.fn();
const expanded = true;

describe('shows card document details footer', () => {
  afterEach(cleanup);
  it('show client document card footer', () => {
    const { asFragment } = render(
      <CardClientDownloadsFooter
        documentsExist={2}
        documentGridRefresh={handleRefreshDocuments}
        handleExpand={handleExpanded}
        expanded={expanded}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
