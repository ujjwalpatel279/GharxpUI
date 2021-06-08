import React, { FunctionComponent, ReactElement, useEffect, useState, MouseEvent } from 'react';

import { services } from '../../../shared';
import './client-applicants.scss';

import { CaseInterface } from '../question-sets/section-menu';

import { ClientDetails } from '../client-details/client-details';
import { UploadDocument } from '../upload-document/upload-document';
import { CustomerDocumentsInterface } from '../../../shared/models';

interface ClientApplicantsInterface {
  caseDetails: CaseInterface;
}

export const ClientApplicants: FunctionComponent<ClientApplicantsInterface> = ({ caseDetails }): ReactElement => {
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [customerIdForUpload, setCustomerIdForUpload] = useState<number>(0);
  const [documents, setDocuments] = useState<Map<number, CustomerDocumentsInterface[]>>();
  const fetchDocuments = async (id: number) => {
    const docs = (await services.getCustomerDocuments(id)).data;
    return docs;
  };

  const showModal = (e: MouseEvent<HTMLButtonElement>) => {
    setCustomerIdForUpload(Number(e.currentTarget.getAttribute('data-value')));
    setModalVisible(true);
  };

  const loadDocumentGrid = async (customerId: number) => {
    const docs = await fetchDocuments(customerId);
    const docsCopy = documents ?? new Map<number, CustomerDocumentsInterface[]>();
    docsCopy.set(customerId, docs);
    setDocuments(docsCopy);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const fetchData = async () => {
    caseDetails?.applicants?.forEach((a) => {
      loadDocumentGrid(a.customerId);
    });
  };

  const deleteDocument: (e: MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
    if (window.confirm('Are you sure you wish to delete this document?')) {
      const id = Number(e.currentTarget.getAttribute('data-value'));
      await services.deleteCustomerDocument(id);
      loadDocumentGrid(id);
    }
  };

  useEffect(() => {
    fetchData();
  }, [caseDetails]);

  return (
    <div className="case-applicants">
      <UploadDocument
        customerId={customerIdForUpload}
        reloadDocumentGrid={loadDocumentGrid}
        show={modalVisible}
        handleClose={hideModal}
      />

      {caseDetails?.applicants?.length > 0 &&
        caseDetails?.applicants?.filter((a) => a.isMainApplicant ?? false)?.length > 0 && (
          <ClientDetails
            applicant={caseDetails?.applicants?.filter((a) => a.isMainApplicant ?? false)[0]}
            documentList={documents?.get(
              caseDetails?.applicants?.filter((a) => a.isMainApplicant ?? false)[0].customerId,
            )}
            fetchData={fetchDocuments}
            showModal={showModal}
            modalVisible={modalVisible}
            deleteDocument={deleteDocument}
          />
        )}
      {caseDetails?.applicants
        ?.filter((a) => !a.isMainApplicant)
        .map((doc, index) => (
          <div key={doc.customerId} className="c-non-main">
            <ClientDetails
              key={doc.customerId}
              applicant={caseDetails?.applicants?.filter((a) => a.customerId === doc.customerId)[0]}
              documentList={documents?.get(
                caseDetails?.applicants?.filter((a) => a.customerId === doc.customerId)[0].customerId,
              )}
              index={index + 1}
              fetchData={fetchDocuments}
              showModal={showModal}
              modalVisible={modalVisible}
              deleteDocument={deleteDocument}
            />
          </div>
        ))}
    </div>
  );
};
