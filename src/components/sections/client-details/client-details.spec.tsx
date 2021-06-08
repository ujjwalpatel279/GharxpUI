import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ClientDetails } from './client-details';
import { ApplicantInterface } from '../applicants/applicant.model';
import { CustomerDocumentsInterface } from '../../../shared/models/customer-documents.model';
import { services } from '../../../shared';

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

  const getCustomerDocumentUrl = jest.spyOn(services, 'getCustomerDocumentUrl').mockImplementation(
    (): Promise<string> =>
      new Promise((resolve) => {
        resolve('test');
      }),
  );

  test('Shows no existing client documents message', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ClientDetails
          index={0}
          applicant={applicant}
          documentList={[]}
          showModal={() => null}
          deleteDocument={() => null}
        />
      </BrowserRouter>,
    );

    expect(getByText('No Documents')).toBeInTheDocument();
  });

  test('Columns are visible on page', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ClientDetails
          index={0}
          applicant={applicant}
          documentList={[customerDocument]}
          showModal={() => null}
          deleteDocument={() => null}
        />
      </BrowserRouter>,
    );

    expect(await getByText(customerDocument.description)).toBeInTheDocument();
  });
});
