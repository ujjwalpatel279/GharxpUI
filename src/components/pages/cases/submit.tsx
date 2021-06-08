import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Container, PageHeading } from '../../shared';
import { services } from '../../../shared';
import { APPLICATION, CASE } from '../../../config/routes';

import { CaseInterface, PageInterface } from '../../../components/sections/question-sets/section-menu';
import { WorkflowStepInterface } from '../../../components/sections/workflow/workflow.model';
import { ApplicantInterface } from '../../../components/sections/applicants/applicant.model';

import { SectionMenu } from '../../../components/sections/question-sets/section-menu/section-menu';
import { Workflow, SubmitCase, CaseNavigation } from '../../../components/sections';
import { workflowConstants } from '../../../shared/types/constants';
import { ApplicationFormStatus, ApplicationStatus } from '../../../shared/types/enums';
import { IconNames } from 'components/shared/icon/icon';

import { defaultErrorResponse, hasError, ServiceHandlingInterface } from '../../../shared/types/service-handling';

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

export const applicationSubmitInitialState: ServiceHandlingInterface<CaseInterface> = {
  data: undefined,
  loading: false,
  error: false,
};

export const SubmitPage: FunctionComponent<ClientDocumentInterface> = ({ location }): ReactElement => {
  const { caseId, loanPurposeId } = useParams<UrlParamInterface>();
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStepInterface[]>([]);
  const [pages, setPages] = useState<PageInterface[]>([]);
  const [moduleText, setModuleText] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<WorkflowStepInterface>();
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>(ApplicationStatus.Active);
  const [menuVisible, toggleMenuVisibility] = useState(false);
  const [shApplicationSubmit, setShApplicationSubmit] = useState<ServiceHandlingInterface<CaseInterface>>(
    applicationSubmitInitialState,
  );

  const fetchPageWithStatus = async (caseId: number, formId: number) => {
    const pageWithStatus: PageInterface[] = (await services.getPagesWithStatus(caseId, formId)).data;
    setPages(pageWithStatus);
    return pageWithStatus[0].sections[0].id;
  };

  // TODO: Fix this function, workout status usage
  const fetchCaseStatus = async (caseId: number) => {
    // const caseStatus: ApplicationStatus = (await services.getCase(caseId)).applicationStatusId;
    const statusId: number = currentStep.applicationFormStatus;

    if (currentStep.applicationFormStatus == ApplicationFormStatus.Complete) {
      setApplicationStatus(ApplicationStatus.Completed);
      fetchModuleText(ApplicationStatus.Completed);
    } else {
      setApplicationStatus(statusId as ApplicationStatus);
    }
  };

  const fetchModuleText = async (status: ApplicationStatus) => {
    let code = '';
    switch (status) {
      case ApplicationStatus.Referred:
      case ApplicationStatus.ReferredWaitingForMoreInfo:
      case ApplicationStatus.ReferredWithMoreInfoSubmited:
      case ApplicationStatus.CallValidateCallCreditRefer:
        {
          code = workflowConstants[currentStep.formTypeId].referred;
        }
        break;
      case ApplicationStatus.Completed:
      case ApplicationStatus.Pass:
        {
          code = workflowConstants[currentStep.formTypeId].successful;
        }
        break;
      case ApplicationStatus.Declined:
      case ApplicationStatus.DeclinedWaitingForMoreInfo:
      case ApplicationStatus.DeclinedWithMoreInfoSubmited:
      case ApplicationStatus.AutoDeclineCancelled:
      case ApplicationStatus.AutoDeclined:
      case ApplicationStatus.AutoDeclinedWaitingForMoreInfo:
      case ApplicationStatus.AutoDeclinedWithMoreInfoSubmited:
        {
          code = workflowConstants[currentStep.formTypeId].unsuccessful;
        }
        break;
    }
    const moduleText = (await services.getModuleText(code)).data;
    setModuleText(moduleText.description);
  };

  const submit = () => {
    setShApplicationSubmit({ ...shApplicationSubmit, loading: true });
    services.submitApplication(Number(caseId), currentStep.formId).then((result) => {
      setShApplicationSubmit(result);
      const status: ApplicationStatus = result.data?.applicationStatus;
      fetchModuleText(status);
      setApplicationStatus(status);
    });
  };

  const downloadCetificate = () => {
    console.log('Download Cetificate');
  };

  const fetchData = async () => {
    const id = Number(caseId);
    await fetchPageWithStatus(id, currentStep.formId);
    await fetchCaseStatus(id);
  };

  const rootPath = `${APPLICATION.paths[0]}/${location?.state?.case?.id ?? caseId}/${
    location?.state?.loanPurposeId ?? Number(loanPurposeId)
  }/${currentStep?.formId}/`;

  useEffect(() => {
    location.state = location.state ?? {
      applicants: [],
      case: null,
      loanPurposeId: Number(loanPurposeId),
    };
    if (currentStep) fetchData();
  }, [caseId, currentStep]);

  if (hasError([shApplicationSubmit])) {
    return defaultErrorResponse();
  }

  return (
    <>
      <Workflow
        caseId={location?.state?.case?.id ?? Number(caseId)}
        loanPurposeId={location?.state?.loanPurposeId ?? Number(loanPurposeId)}
        setActiveWorkflowStep={setCurrentStep}
        setWorkflowSteps={setWorkflowSteps}
      />
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
              workflowName={currentStep?.formType}
              closeMenu={toggleMenuVisibility}
            />
          </div>
          <div className="l-question-sets__questions">
            <div className="l-question-sets__header">
              <PageHeading
                headingLevel={2}
                title={currentStep?.formType}
                icon={currentStep?.formType?.toLowerCase() as IconNames}
                mb={6}
              />
            </div>
            <Container ctabar>
              <div className="c-question-set">
                <SubmitCase
                  submitFunction={submit}
                  formType={currentStep?.formType}
                  applicationStatus={applicationStatus}
                  pages={pages}
                  moduleText={moduleText}
                  caseId={Number(caseId ?? 0)}
                  formId={currentStep?.formId ?? 0}
                  downloadCertificate={downloadCetificate}
                />
                {applicationStatus == ApplicationStatus.Completed && (
                  <>
                    <CaseNavigation pages={pages} workflowSteps={workflowSteps} location={location} />
                  </>
                )}
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};
