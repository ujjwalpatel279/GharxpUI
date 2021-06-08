import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Workflow } from './workflow';
import { WorkflowInterface, WorkflowStepInterface } from './workflow.model';
import { ApplicationFormStatus } from '../../../shared';
import { services } from '../../../shared';

import { ServiceHandlingInterface } from '../../../shared/types/service-handling';

const mockWorkflowStepResult: WorkflowStepInterface[] = [
  {
    id: 1,
    formType: 'dip',
    stepOrder: 1,
    isActive: false,
    applicationFormStatus: ApplicationFormStatus.NoData,
    formId: 15,
  },
];
const mockWorkflowResult: WorkflowInterface = {
  id: 0,
  description: 'Test workflow',
  statusId: 1,
  workflowSteps: mockWorkflowStepResult,
  helpText: 'Test',
};

const getWorkflowSpy = jest.spyOn(services, 'getWorkflowSteps').mockImplementation(
  (loanPurposeId: number): Promise<ServiceHandlingInterface<WorkflowInterface>> =>
    new Promise((resolve) => {
      resolve({ data: mockWorkflowResult, loading: false, error: false });
    }),
);

describe('Workflow Component', () => {
  afterEach(cleanup);
  test('Check workflow call to be triggered', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Workflow loanPurposeId={15} caseId={null} />
      </BrowserRouter>,
    );
    expect(getWorkflowSpy).toBeCalled();
  });
});
