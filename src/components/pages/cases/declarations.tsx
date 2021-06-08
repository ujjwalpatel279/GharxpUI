import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Section } from '../../shared';
import { services } from '../../../shared';
import { CASE } from '../../../config/routes';

import { CaseInterface, PageInterface } from '../../sections/question-sets/section-menu';
import { WorkflowInterface, WorkflowStepInterface } from '../../sections/workflow/workflow.model';
import { ApplicantInterface } from '../../sections/applicants/applicant.model';
import { DeclarationsTable } from '../../sections/declarations/declarations-table/declarations-table';

import { Workflow } from '../../sections';
import { SectionMenu } from '../../sections/question-sets/section-menu/section-menu';

interface DeclarationDocumentInterface {
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

export const DeclarationsPage: FunctionComponent<DeclarationDocumentInterface> = ({ location }): ReactElement => {
  const { caseId, loanPurposeId } = useParams<UrlParamInterface>();
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStepInterface[]>([]);
  const [pages, setPages] = useState<PageInterface[]>([]);
  const [, setWorkflowStep] = useState<WorkflowStepInterface>();
  const [formId, setFormId] = useState<number>();
  const [, toggleMenuVisibility] = useState(false);

  const fetchApplicationProgressBarSteps = async (caseId: number, loanPurposeId: number) => {
    const applicationWorkflow: WorkflowInterface = (await services.getDynamicWorkflow(caseId, loanPurposeId)).data;
    setWorkflowSteps(applicationWorkflow.workflowSteps);

    const currentStep = applicationWorkflow.workflowSteps[applicationWorkflow.workflowSteps.length - 1];
    setWorkflowStep(currentStep);

    return currentStep;
  };

  const fetchPageWithStatus = async (caseId: number, formId: number) => {
    const pageWithStatus: PageInterface[] = (await services.getPagesWithStatus(caseId, formId)).data;
    setPages(pageWithStatus);
    setFormId(formId);

    return pageWithStatus[0].sections[0].id;
  };

  const fetchCaseDetails = async (id: number, loanPurposeId: number) => {
    const c: CaseInterface = location.state.case ?? (await services.getCase(id)).data;
    location.state = {
      applicants: c.applicants,
      case: c,
      loanPurposeId: loanPurposeId,
    };
  };

  const fetchData = async () => {
    const id = Number(caseId);
    const loanPurpose = Number(loanPurposeId);
    const applicationProgressBarSteps = await fetchApplicationProgressBarSteps(id, loanPurpose);
    await fetchPageWithStatus(id, applicationProgressBarSteps.formId);
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

  return (
    <>
      <Container></Container>
      <Section>
        <div className="l-grid">
          <div className="l-grid_span-12 l-grid_span-4@bp20">
            <SectionMenu
              pages={pages}
              rootPath={`${CASE.paths[0]}/${location?.state?.case?.id ?? caseId}/`}
              location={location}
              workflowName={'Declarations'}
              closeMenu={toggleMenuVisibility}
            />
          </div>
          <div className="l-grid_span-12 l-grid_span-8@bp20">
            <DeclarationsTable
              pages={pages}
              steps={workflowSteps}
              location={location}
              formId={formId}
              caseId={Number(caseId)}
            />
          </div>
        </div>
      </Section>
    </>
  );
};
