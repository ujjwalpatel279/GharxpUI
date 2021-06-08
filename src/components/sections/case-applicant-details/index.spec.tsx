import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, waitFor } from '@testing-library/react';

import { CaseApplicantsDetails } from '.';
import { ApplicantInterface } from '../../../shared/models';

const handleRefreshDocuments = jest.fn();

const applicantObj: ApplicantInterface = {
  id: '1',
  firstName: 'foo',
  surname: 'bar',
  isMainApplicant: true,
  email: 'string',
  mobileNumber: 'string',
};

describe('shows card details', () => {
  afterEach(cleanup);
  it('renders the first name and surname', () => {
    waitFor(() => {
      const { getByText } = render(
        <BrowserRouter>
          <CaseApplicantsDetails
            applicant={applicantObj}
            documents={[
              {
                canBeDeleted: false,
                compressed: false,
                customerId: 1,
                description: 'description',
                docCode: 'docCode',
                documentBinaryString: 'documentBinaryString',
                formId: 1,
                id: 1,
                mimeType: 'mimeType',
                typeCatagory: 'typeCatagory',
                typeId: 1,
                uploadedOn: 'uploadedOn',
              },
            ]}
            documentUrl={
              'https://brokerui-dev.mutualvision.systems/account/Customer/GetDocument/ee6a192e-73d1-4c9a-b2d7-8de883f37fc5/'
            }
            clientId={1}
            documentGridRefresh={handleRefreshDocuments}
          />
        </BrowserRouter>,
      );
      expect(getByText(`${applicantObj.firstName} ${applicantObj.surname}`)).toBeTruthy();
    });
  });
});
