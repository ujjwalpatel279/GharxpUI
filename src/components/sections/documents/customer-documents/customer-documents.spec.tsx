import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CustomerDocumentsTable } from './customer-documents';
import { ApplicantInterface } from '../../applicants/applicant.model';
import { CustomerDocumentsInterface } from './customer-documents.model';

describe('Customer Documents Component', () => {
  afterEach(cleanup);

  const applicant: ApplicantInterface = {
    firstName: 'First',
    id: '1',
    surname: 'Last',
  };

  const customerDocument: CustomerDocumentsInterface = {
    id: 1,
    description: 'description',
    customerId: 1,
  };

  test('Shows no existing client documents message', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <CustomerDocumentsTable
          index={0}
          applicant={applicant}
          deleteDocumentFunction={() => null}
          documentList={[]}
          showModal={() => null}
        />
      </BrowserRouter>,
    );

    expect(getByText('No existing client documents')).toBeInTheDocument();
  });

  test('Columns are visible on page', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <CustomerDocumentsTable
          index={0}
          applicant={applicant}
          deleteDocumentFunction={() => null}
          documentList={[customerDocument]}
          showModal={() => null}
        />
      </BrowserRouter>,
    );

    expect(getByText('Category')).toBeInTheDocument();
    expect(getByText('Document Name')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
  });
});
