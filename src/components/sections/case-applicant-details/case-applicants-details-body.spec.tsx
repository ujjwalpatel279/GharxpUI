import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CaseApplicantsDetailsBody } from './case-applicants-details-body';

describe('shows card details body', () => {
  afterEach(cleanup);
  it('show client information on card', () => {
    const { asFragment } = render(
      <CaseApplicantsDetailsBody
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
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
