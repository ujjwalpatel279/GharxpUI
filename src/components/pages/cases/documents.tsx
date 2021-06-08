import React, { FunctionComponent, ReactElement, useEffect, useState, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';

import { Section, Button, Heading } from '../../shared';
import { services } from '../../../shared';
import { CASE } from '../../../config/routes';

import { CaseInterface, PageInterface } from '../../../components/sections/question-sets/section-menu';
import { WorkflowStepInterface } from '../../../components/sections/workflow/workflow.model';
import { ApplicantInterface } from '../../../components/sections/applicants/applicant.model';

import { CustomerDocumentsTable } from '../../sections/documents/customer-documents/customer-documents';
import { SectionMenu } from '../../../components/sections/question-sets/section-menu/section-menu';
import { UploadDocument } from '../../sections/upload-document/upload-document';

interface ClientDocumentInterface {
  location?: {
    state: {
      loanPurposeId: number;
      case: CaseInterface;
      applicants: ApplicantInterface[];
    };
  };
}

interface UrlParamInterface {
  caseId?: string;
  loanPurposeId?: string;
}

export const DocumentsPage: FunctionComponent<ClientDocumentInterface> = ({ location }): ReactElement => {
  const { caseId, loanPurposeId } = useParams<UrlParamInterface>();
  const [pages, setPages] = useState<PageInterface[]>([]);
  const [caseDetails, setCaseDetails] = useState<CaseInterface>();
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [customerIdForUpload, setCustomerIdForUpload] = useState<number>(0);
  const [documentGridToRefresh, setDocumentGridToRefresh] = useState<number>(0);
  const [documentCounts, setDocumentCounts] = useState<number[]>([]);
  const [mandatoryDocuments, setMandatoryDocuments] = useState<boolean>(true);
  const [allowProceed, setAllowProceed] = useState<boolean>(false);
  const [, toggleMenuVisibility] = useState(false);

  const fetchPageWithStatus = async (caseId: number, formId: number) => {
    const pageWithStatus: PageInterface[] = (await services.getPagesWithStatus(caseId, formId)).data;
    setPages(pageWithStatus);
    return pageWithStatus[0].sections[0].id;
  };

  const fetchDocuments = async (id: number) => {
    const documents = (await services.getCustomerDocuments(id)).data;
    const applicant = caseDetails.applicants.filter((a) => a.customerId === id)[0];
    const docCounts = documentCounts;
    docCounts.splice(caseDetails.applicants.indexOf(applicant), 1, documents.length);
    setDocumentCounts(docCounts);
    const sum = docCounts.reduce((sum, a) => sum + a);
    setAllowProceed(sum > 0);
    return documents;
  };

  const showModal = (e: MouseEvent<HTMLButtonElement>) => {
    setCustomerIdForUpload(Number(e.currentTarget.getAttribute('data-value')));
    setModalVisible(true);
  };

  const reloadDocumentGrid = (customerId: number) => {
    setDocumentGridToRefresh(customerId);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const fetchCaseDetails = async (id: number, loanPurposeId: number) => {
    const caseDetail: CaseInterface = location.state.case ?? (await services.getCase(id)).data;
    location.state = {
      applicants: caseDetail.applicants,
      case: caseDetail,
      loanPurposeId: loanPurposeId,
    };
    setDocumentCounts(caseDetail.applicants.map(() => 0));
    const mandatoryDocs = (await services.getMandatoryDocuments()).data;
    setMandatoryDocuments(mandatoryDocs.value.toLowerCase() === 'on');

    setCaseDetails(caseDetail);
  };

  const fetchData = async () => {
    const id = Number(caseId);
    const loanPurpose = Number(loanPurposeId);
    //await fetchPageWithStatus(id, applicationProgressBarSteps.formId);
    await fetchCaseDetails(id, loanPurpose);
  };

  useEffect(() => {
    location.state = location.state ?? {
      applicants: [],
      case: null,
      loanPurposeId: Number(loanPurposeId),
    };
    fetchData();
  }, [caseId]);

  const deleteDocument: (e: MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
    if (window.confirm('Are you sure you wish to delete this document?')) {
      const id = e.currentTarget.getAttribute('data-value');
      await services.deleteCustomerDocument(Number(id));
    }
  };

  return (
    <>
      <Section>
        <UploadDocument
          customerId={customerIdForUpload}
          reloadDocumentGrid={reloadDocumentGrid}
          show={modalVisible}
          handleClose={hideModal}
        ></UploadDocument>

        <div className="l-grid">
          <div className="l-grid_span-12 l-grid_span-4@bp20">
            <SectionMenu
              pages={pages}
              rootPath={`${CASE.paths[0]}/${location?.state?.case?.id ?? caseId}/`}
              location={location}
              workflowName="documents"
              closeMenu={toggleMenuVisibility}
            />
          </div>
          <div className="l-grid_span-12 l-grid_span-8@bp20">
            <Heading level="h3" title={'Documents Required'} mb={4} />
            <span className="u-fs-2">Please upload supporting documentation:</span>
            {caseDetails?.applicants?.length > 0 &&
              caseDetails?.applicants?.filter((a) => a.isMainApplicant ?? false)?.length > 0 && (
                <CustomerDocumentsTable
                  applicant={caseDetails?.applicants?.filter((a) => a.isMainApplicant ?? false)[0]}
                  deleteDocumentFunction={deleteDocument}
                  fetchData={fetchDocuments}
                  showModal={showModal}
                  modalVisible={modalVisible}
                  refresh={documentGridToRefresh === customerIdForUpload}
                ></CustomerDocumentsTable>
              )}
            {caseDetails?.applicants
              ?.filter((a) => !a.isMainApplicant)
              .map((doc, index) => (
                <div key={doc.customerId}>
                  <span></span>
                  <CustomerDocumentsTable
                    key={doc.customerId}
                    applicant={caseDetails?.applicants?.filter((a) => a.customerId === doc.customerId)[0]}
                    index={index + 1}
                    deleteDocumentFunction={deleteDocument}
                    fetchData={fetchDocuments}
                    showModal={showModal}
                    modalVisible={modalVisible}
                    refresh={documentGridToRefresh === null || documentGridToRefresh === customerIdForUpload}
                  ></CustomerDocumentsTable>
                </div>
              ))}
            <div>
              <Button
                variant="primary"
                childClasses="continue-button"
                type="button"
                disabled={(mandatoryDocuments && allowProceed) || !mandatoryDocuments ? false : true}
              >
                {pages.indexOf(pages.filter((p) => p.name === 'Documents')[0]) === pages.length - 1
                  ? 'Complete Full Mortgage Application'
                  : 'Continue'}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};
