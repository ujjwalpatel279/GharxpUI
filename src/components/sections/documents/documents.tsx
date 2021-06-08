import React, { FunctionComponent, ReactElement, useEffect, useState, MouseEvent } from 'react';

import { Button, Container, Heading, PageHeading } from '../../../components/shared';

import { IconNames } from '../../../components/shared/icon/icon';
import '../question-sets/question-sets.scss';

import { services } from '../../../shared';
import { CaseNavigation } from '../case-navigation/case-navigation';

import { CaseInterface, PageInterface } from '../../../components/sections/question-sets/section-menu';
import { WorkflowStepInterface } from '../../../components/sections/workflow/workflow.model';
import { ApplicantInterface } from '../../../components/sections/applicants/applicant.model';

import { CustomerDocumentsTable } from './customer-documents/customer-documents';
import { SectionMenu } from '../../../components/sections/question-sets/section-menu/section-menu';
import { UploadDocument } from '../upload-document/upload-document';

interface sectionMenuInterface {
  pages: PageInterface[];
  steps: WorkflowStepInterface[];
  rootPath: string;
  location?: {
    state?: {
      loanPurposeId: number;
      case?: CaseInterface;
      applicants?: ApplicantInterface[];
    };
  };
  workflowName: string;
  caseId: number;
  formId: number;
  loanPurposeId: number;
}

export const Documents: FunctionComponent<sectionMenuInterface> = ({
  pages,
  steps,
  rootPath,
  location,
  workflowName,
  caseId,
  loanPurposeId,
}) => {
  const [menuVisible, toggleMenuVisibility] = useState(false);
  const [caseDetails, setCaseDetails] = useState<CaseInterface>();
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [customerIdForUpload, setCustomerIdForUpload] = useState<number>(0);
  const [documentGridToRefresh, setDocumentGridToRefresh] = useState<number>(0);
  const [documentCounts, setDocumentCounts] = useState<number[]>([]);
  const [mandatoryDocuments, setMandatoryDocuments] = useState<boolean>(true);
  const [allowProceed, setAllowProceed] = useState<boolean>(false);

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
    const c: CaseInterface = location?.state?.case ?? (await services.getCase(id)).data;
    location.state = {
      applicants: c.applicants,
      case: c,
      loanPurposeId: loanPurposeId,
    };
    setDocumentCounts(c.applicants.map(() => 0));
    const m = (await services.getMandatoryDocuments()).data;
    setMandatoryDocuments(m.value.toLowerCase() === 'on');

    setCaseDetails(c);
  };

  const deleteDocument: (e: MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
    if (window.confirm('Are you sure you wish to delete this document?')) {
      const id = e.currentTarget.getAttribute('data-value');
      await services.deleteCustomerDocument(Number(id));
    }
  };

  useEffect(() => {
    fetchCaseDetails(caseId, loanPurposeId);
  }, [caseId, loanPurposeId]);

  return (
    <>
      <UploadDocument
        customerId={customerIdForUpload}
        reloadDocumentGrid={reloadDocumentGrid}
        show={modalVisible}
        handleClose={hideModal}
      ></UploadDocument>
      <div className="l-question-sets">
        <div className="l-question-sets__toggle-menu">
          <Button
            type="button"
            variant="navy"
            icon="chevronRight"
            iconPosition="right"
            onClick={() => toggleMenuVisibility(!menuVisible)}
          >
            Open Steps
          </Button>
        </div>
        <div className="l-question-sets__content">
          <div className={`l-question-sets__menu ${menuVisible && 'isActive'}`}>
            <SectionMenu
              pages={pages}
              rootPath={rootPath}
              location={location}
              workflowName={workflowName}
              closeMenu={toggleMenuVisibility}
            />
          </div>
          <div className="l-question-sets-anchor-bg"></div>
          <div className="l-question-sets__questions">
            <div className="l-question-sets__header">
              <PageHeading
                headingLevel={2}
                title={workflowName}
                icon={workflowName?.toLowerCase() as IconNames}
                mb={6}
              />
            </div>
            <Container ctabar>
              <div className="c-question-set">
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

                <CaseNavigation
                  pages={pages}
                  workflowSteps={steps}
                  location={location}
                  nextDisabled={(mandatoryDocuments && allowProceed) || !mandatoryDocuments ? false : true}
                />
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};
