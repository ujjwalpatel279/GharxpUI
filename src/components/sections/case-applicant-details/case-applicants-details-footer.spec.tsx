import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CaseApplicantsDetailsFooter } from './case-applicants-details-footer';

const handleRefreshDocuments = jest.fn();
const handleExpanded = jest.fn();
const expanded = true;

describe('shows card document details footer', () => {
  afterEach(cleanup);
  it('show client document card footer', () => {
    const { asFragment } = render(
      <CaseApplicantsDetailsFooter
        documentsExist={2}
        documentGridRefresh={handleRefreshDocuments}
        handleExpand={handleExpanded}
        expanded={expanded}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
