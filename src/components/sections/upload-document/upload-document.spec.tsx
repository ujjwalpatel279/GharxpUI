import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UploadDocument, UploadDocumentInterface } from './upload-document';

describe('Upload Document Component', () => {
  afterEach(cleanup);

  test('Shows correct form text', () => {
    const { getByText } = render(
      <BrowserRouter>
        <UploadDocument show={true} customerId={1} handleClose={() => null} reloadDocumentGrid={() => null} />
      </BrowserRouter>,
    );

    expect(getByText('File to upload')).toBeInTheDocument();
    expect(getByText('Category')).toBeInTheDocument();
    expect(getByText('File Description')).toBeInTheDocument();
    expect(getByText('Upload')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
