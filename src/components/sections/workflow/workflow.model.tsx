import { ApplicationFormStatus } from 'shared';

export type WorkflowStepFormType = 'applicants' | 'application' | 'dip' | 'illustration' | 'submit';

export interface WorkflowStepInterface {
  id: number;
  formType: WorkflowStepFormType;
  formTypeId?: number;
  stepOrder: number;
  isActive: boolean;
  isComplete?: boolean;
  applicationFormStatus: ApplicationFormStatus;
  formId: number;
}

export interface WorkflowInterface {
  id: number;
  description: string;
  statusId: number;
  helpText: string;
  workflowSteps: WorkflowStepInterface[];
}

export interface WorkflowCompletionInterface {
  workflowStepId: number;
  isComplete: boolean;
}
