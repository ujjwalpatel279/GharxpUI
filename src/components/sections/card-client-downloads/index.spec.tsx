import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { CardClientDownloads } from './index';

const handleRefreshDocuments = jest.fn();

describe('shows documents', () => {
  afterEach(cleanup);
  it('show client documents on card', () => {
    const { container } = render(
      <CardClientDownloads
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
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
