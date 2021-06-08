import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DeclarationInterface } from './declarations.model';
import { DeclarationsTable } from './declarations-table';

describe('Declarations Component', () => {
  afterEach(cleanup);

  const declaration: DeclarationInterface = {
    declarationDocumentId: 1,
    formId: 1,
    name: 'declaration',
    description: 'description',
    accepted: true,
  };

  test('Shows no existing declarations', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <DeclarationsTable pages={[]} steps={[]} formId={2} caseId={1} data={[]} />
      </BrowserRouter>,
    );

    expect(getByText('No existing declarations')).toBeInTheDocument();
  });

  test('Columns are visible on page', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <DeclarationsTable pages={[]} steps={[]} formId={2} caseId={1} data={[declaration]} />
      </BrowserRouter>,
    );

    expect(getByText('Declaration')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });
});
