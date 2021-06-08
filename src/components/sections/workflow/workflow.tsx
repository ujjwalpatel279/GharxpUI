import { APPLICANTS } from '../../../config/routes';
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { ApplicationFormStatus, services } from '../../../shared';

import { Icon } from '../../shared';
import { WorkflowStepFormType, WorkflowStepInterface, WorkflowInterface } from './workflow.model';

import { defaultErrorResponse, hasError, ServiceHandlingInterface } from '../../../shared/types/service-handling';

import './workflow.scss';

interface workflowInterface {
  caseId?: number | string;
  loanPurposeId: number;
  setWorkflowSteps?: (steps: WorkflowStepInterface[]) => void;
  setActiveWorkflowStep?: (activeStep: WorkflowStepInterface) => void;
}
interface UrlParamInterface {
  formId?: string;
}

export const workflowInitialState: ServiceHandlingInterface<WorkflowInterface> = {
  data: undefined,
  loading: false,
  error: false,
};

export const Workflow: FunctionComponent<workflowInterface> = ({
  caseId,
  loanPurposeId,
  setWorkflowSteps,
  setActiveWorkflowStep,
}): ReactElement => {
  const { formId } = useParams<UrlParamInterface>();
  const { path } = useRouteMatch();
  const [steps, setSteps] = useState<WorkflowStepInterface[]>([]);
  const [shWorkflowSteps, setShWorkflowSteps] = useState<ServiceHandlingInterface<WorkflowInterface>>(
    workflowInitialState,
  );
  const history = useHistory();

  useEffect(() => {
    if (loanPurposeId) {
      setShWorkflowSteps({ ...shWorkflowSteps, loading: true });
      (caseId
        ? services.getDynamicWorkflow(Number(caseId), loanPurposeId)
        : services.getWorkflowSteps(loanPurposeId)
      ).then((result) => {
        const defaultApplicationWorkflow: WorkflowStepInterface = {
          id: 1,
          formType: 'applicants',
          stepOrder: 0,
          isActive: false,
          formId: 0,
          applicationFormStatus: caseId > 0 ? ApplicationFormStatus.Complete : ApplicationFormStatus.NoData,
        };
        setShWorkflowSteps(result);
        const workflowSteps = [defaultApplicationWorkflow, ...result.data?.workflowSteps];
        selectActiveWorkflowStep(workflowSteps);
      });
    }
  }, [caseId, loanPurposeId, setActiveWorkflowStep, setWorkflowSteps, history, history.location.pathname]);

  const selectActiveWorkflowStep = (workflowSteps: WorkflowStepInterface[]) => {
    const currentFormId = Number(formId ?? 0);
    const activeStep = path.match(APPLICANTS.path)
      ? workflowSteps[0]
      : currentFormId === 0
      ? workflowSteps[1]
      : workflowSteps.find((step) => step.formId === currentFormId) ?? workflowSteps[1];

    activeStep.isActive = true;
    setSteps(workflowSteps);
    if (setWorkflowSteps) setWorkflowSteps(workflowSteps);
    if (setActiveWorkflowStep) setActiveWorkflowStep(activeStep);
  };

  if (hasError([shWorkflowSteps])) {
    return defaultErrorResponse();
  }

  return (
    <div className="c-app-workflow-wrap">
      <ol className="c-app-workflow">
        {steps.map((step: WorkflowStepInterface, i) => {
          let itemClasses = 'c-app-workflow__item';

          const iconName: WorkflowStepFormType = step.formType.toLowerCase() as WorkflowStepFormType;

          if (step.isActive) {
            itemClasses += ' isActive';
          }

          if (step.applicationFormStatus == ApplicationFormStatus.Complete) {
            itemClasses += ' isComplete';
          }

          const formName = `${step.formType.charAt(0).toUpperCase()}${step.formType.substring(
            1,
            step.formType.length,
          )}`;

          return (
            <li key={`w-${step.id}`} className={itemClasses}>
              <Icon name={iconName} />
              <span className="c-app-workflow__name">{`0${i + 1} | ${formName}`}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
