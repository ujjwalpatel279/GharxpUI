import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Workflow } from '../../sections/workflow/workflow';
import { Button, Container, Heading } from '../../shared';

import { WorkflowInterface, WorkflowStepInterface } from '../../sections/workflow/workflow.model';
import { CaseInterface } from '../../sections/question-sets/section-menu/case.model';
import { PageInterface } from '../../sections/question-sets/section-menu/page.model';
import { ApplicantInterface, FeeInterface } from 'shared/models';
import { AddFees, FeeType } from '../../sections/fees/add-fees/add-fees';
import { SectionMenu } from '../../sections/question-sets/section-menu/section-menu';
import { services } from '../../../shared';
import { CASE } from '../../../config/routes';

interface FeePageInterface {
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
export const FeePage: FunctionComponent<FeePageInterface> = ({ location }): ReactElement => {
  const { caseId, loanPurposeId } = useParams<UrlParamInterface>();
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStepInterface[]>([]);
  const [pages, setPages] = useState<PageInterface[]>([]);
  const [workflowStep, setWorkflowStep] = useState<WorkflowStepInterface>();
  const [isWorldPayProviderActive, setIsWorldPayProviderActive] = useState<boolean>();
  const [fees, setFees] = useState<FeeInterface[]>(null);
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
    return pageWithStatus[0].sections[0].id;
  };

  const fetchFees = async (caseId: number, formId: number, feeType: FeeType) => {
    const result = (await services.getFees(caseId, formId)).data;
    if (feeType === FeeType.PayableNow) {
      return result?.filter((f) => !f.selected && f.payableOn === 'On Application');
    }
    return result?.filter((f) => f.isAddedToLoan && !f.isPaid);
  };

  const reloadGrids = async (caseId: number, formId: number) => {
    setFees((await services.getFees(caseId, formId)).data);
  };

  const fetchData = async () => {
    const id = Number(caseId);
    const loanPurpose = Number(loanPurposeId);
    const applicationProgressBarSteps = await fetchApplicationProgressBarSteps(id, loanPurpose);
    await fetchPageWithStatus(id, applicationProgressBarSteps.formId);
    await reloadGrids(id, applicationProgressBarSteps.formId);
    setIsWorldPayProviderActive((await services.isWorldPayProviderActive()).data);
  };

  useEffect(() => {
    location.state = {
      applicants: [],
      case: null,
      loanPurposeId: Number(loanPurposeId),
    };
    fetchData();
  }, [caseId]);

  return (
    <Container>
      <Workflow
        caseId={location?.state?.case?.id ?? Number(caseId)}
        loanPurposeId={location?.state?.loanPurposeId ?? Number(loanPurposeId)}
      />
      <Heading level="h1" title="Fees" mb={4} />
      <div className="l-grid">
        <div className="l-grid_span-12 l-grid_span-4@bp20">
          <SectionMenu
            pages={pages}
            rootPath={`${CASE.paths[0]}/${location?.state?.case?.id ?? caseId}/`}
            location={location}
            workflowName={'fees'}
            closeMenu={toggleMenuVisibility}
          />
        </div>
        <div className="l-grid_span-12 l-grid_span-8@bp20">
          <AddFees
            caseId={location?.state?.case?.id ?? Number(caseId)}
            formId={workflowStep?.formId}
            heading={'Fees that can be added to the loan amount'}
            noRowsMessage={`No fees can be added to this loan`}
            feeType={FeeType.AddToLoan}
            feeData={fees?.filter((f) => f.isAddedToLoan && !f.isPaid)}
            reloadGrids={reloadGrids}
          />
          {isWorldPayProviderActive && (
            <AddFees
              caseId={location?.state?.case?.id ?? Number(caseId)}
              formId={workflowStep?.formId}
              feeData={fees?.filter((f) => !f.selected && f.payableOn === 'On Application')}
              heading={'Fees to pay now'}
              noRowsMessage={'No fees to pay now'}
              feeType={FeeType.PayableNow}
              reloadGrids={reloadGrids}
            />
          )}
          <Button type="button" variant="primary">
            Complete Full Mortgage Application
          </Button>
        </div>
      </div>
    </Container>
  );
};
