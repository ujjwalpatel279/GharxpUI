import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Section, Button } from '../../shared';
import { ApplicationFormStatus, services } from '../../../shared';
import { CASE } from '../../../config/routes';

import { CaseInterface, PageInterface } from '../../sections/question-sets/section-menu';
import { WorkflowInterface, WorkflowStepInterface } from '../../sections/workflow/workflow.model';
import { ApplicantInterface } from '../../sections/applicants/applicant.model';

import { Workflow, CompleteCase } from '../../sections';
import { SectionMenu } from '../../sections/question-sets/section-menu/section-menu';
import { CompletionContainer } from '../../shared';
import { ApplicationStatus } from '../../../shared/types/enums';

interface CaseSubmissionInterface {
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

export const CompleteCasePage: FunctionComponent<CaseSubmissionInterface> = ({ location }): ReactElement => {
  const { caseId, loanPurposeId } = useParams<UrlParamInterface>();
  const [, setWorkflowSteps] = useState<WorkflowStepInterface[]>([]);
  const [pages, setPages] = useState<PageInterface[]>([]);
  const [, setWorkflowStep] = useState<WorkflowStepInterface>();
  const [caseDetails, setCaseDetails] = useState<CaseInterface>();
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [societyName, setSocietyName] = useState<string>('');
  const [, toggleMenuVisibility] = useState(false);

  const defaultApplicationWorkflow: WorkflowStepInterface = {
    id: 0,
    formType: `applicants`,
    stepOrder: 0,
    isActive: false,
    formId: 0,
    applicationFormStatus: ApplicationFormStatus.Complete,
  };

  const fetchApplicationProgressBarSteps = async (caseId: number, loanPurposeId: number) => {
    const applicationWorkflow: WorkflowInterface = (await services.getDynamicWorkflow(caseId, loanPurposeId)).data;
    setWorkflowSteps([defaultApplicationWorkflow, ...applicationWorkflow.workflowSteps]);
    const currentStep = applicationWorkflow.workflowSteps[1];

    setWorkflowStep(currentStep);
    return currentStep;
  };

  const fetchPageWithStatus = async (caseId: number, formId: number) => {
    const pageWithStatus: PageInterface[] = (await services.getPagesWithStatus(caseId, formId)).data;
    setPages(pageWithStatus);
    return pageWithStatus[0].sections[0].id;
  };

  const fetchCaseDetails = async (id: number, loanPurposeId: number) => {
    const c: CaseInterface = (await services.getCase(id)).data;
    location.state = {
      applicants: c.applicants,
      case: c,
      loanPurposeId: loanPurposeId,
    };

    setCaseDetails(c);
  };

  const fetchSocietyName = async () => {
    const societyName = (await services.getModuleText('[SOCIETY-NAME]__SYST_SOC_DTLS')).data;
    setSocietyName(societyName.description);
  };

  const fetchData = async () => {
    const id = Number(caseId);
    const loanPurpose = Number(loanPurposeId);
    const applicationProgressBarSteps = await fetchApplicationProgressBarSteps(id, loanPurpose);
    await fetchPageWithStatus(id, applicationProgressBarSteps.formId);
    await fetchCaseDetails(id, loanPurpose);
    await fetchSocietyName();
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    location.state = {
      applicants: [],
      case: null,
      loanPurposeId: Number(loanPurposeId),
    };
    fetchData();
  }, [caseId]);

  // if (caseDetails && caseDetails.applicationStatusId !== 2) {
  //   return <Redirect to={{ pathname: CASES.path }} />;
  // }

  // above commented out because until the rest is done the appStatusId is always !== 2

  return (
    <>
      <Container>
        <Workflow
          caseId={location?.state?.case?.id ?? Number(caseId)}
          loanPurposeId={location?.state?.loanPurposeId ?? Number(loanPurposeId)}
        />
      </Container>
      <Section>
        <CompleteCase societyName={societyName} show={modalVisible} handleClose={hideModal}></CompleteCase>
        <div>
          <div>
            <SectionMenu
              pages={pages}
              rootPath={`${CASE.paths[0]}/${location?.state?.case?.id ?? caseId}/`}
              location={location}
              workflowName="Case Submission"
              closeMenu={toggleMenuVisibility}
            />
          </div>
          {societyName && (
            <CompletionContainer
              heading={`Are you ready to submit this mortgage case to ${societyName}?`}
              text="Your case is ready to submit. Once it has been submitted you will not be able to edit any details."
            >
              <Button
                variant="primary"
                type="button"
                onClick={showModal}
                width="full"
                disabled={
                  caseDetails.applicationstatus !== ApplicationStatus.Completed &&
                  caseDetails.applicationStatusId !== ApplicationStatus.Completed
                }
              >
                Submit Case
              </Button>
            </CompletionContainer>
          )}
        </div>
      </Section>
    </>
  );
};
