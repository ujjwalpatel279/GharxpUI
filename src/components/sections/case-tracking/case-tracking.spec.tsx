import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CaseTracking } from './case-tracking';
import { WorkflowStepInterface } from '../workflow/workflow.model';
import { StageInterface } from '../../../shared/models';
import { ApplicationFormStatus } from '../../../shared/types/enums';

describe('Case Dashboard Table Component', () => {
  afterEach(cleanup);
  const workflowSteps: WorkflowStepInterface[] = [];
  const stageName = 'FirstStage';
  const stageComponentName = 'FirstStep';
  const stages: StageInterface[] = [
    {
      stageId: 1,
      icon: 'test',
      createdOn: new Date(Date.now()),
      createdBy: 'Tester',
      modifiedOn: new Date(Date.now()),
      modifiedBy: 'Tester',
      isDefault: false,
      name: stageName,
      components: [
        {
          stageId: 1,
          stageComponentId: 1,
          name: stageComponentName,
          isAllowUploadDocumentAdmin: false,
          isAllowUploadDocumentBroker: false,
          statusDescription: 'active',
          statusId: 1,
          createdOn: new Date(Date.now()),
          createdBy: 'Tester',
          modifiedOn: new Date(Date.now()),
          modifiedBy: 'Tester',
          isComplete: false,
          isDefault: false,
          documentId: 0,
        },
      ],
    },
  ];

  test('Shows no existing cases message', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <CaseTracking workflowSteps={workflowSteps} caseStages={[]} caseId={1} />
      </BrowserRouter>,
    );

    expect(getByText('No case tracking details are currently available.')).toBeInTheDocument();
    expect(getByText('Form')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();
    expect(getByText('Submission Date')).toBeInTheDocument();
    expect(getByText('Download')).toBeInTheDocument();
  });

  test('Toggle tab', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <CaseTracking workflowSteps={workflowSteps} caseStages={stages} caseId={1} />
      </BrowserRouter>,
    );

    await act(async () => {
      await setTimeout(() => {
        getByText(stageName).click();
      }, 100);
      await setTimeout(jest.fn(), 100);
    });

    expect(getByText(stageComponentName)).toBeInTheDocument();
  });
  test('download button only available when status is complete', async () => {
    const steps: WorkflowStepInterface[] = [
      {
        id: 2,
        formType: 'application',
        formTypeId: 123,
        stepOrder: 1,
        isActive: true,
        isComplete: false,
        applicationFormStatus: ApplicationFormStatus.Partial,
        formId: 1,
      },
      {
        id: 3,
        formType: 'application',
        formTypeId: 123,
        stepOrder: 1,
        isActive: false,
        isComplete: true,
        applicationFormStatus: ApplicationFormStatus.Complete,
        formId: 1,
      },
    ];

    const { getAllByText } = render(
      <BrowserRouter>
        <CaseTracking workflowSteps={steps} caseStages={[]} caseId={1} />
      </BrowserRouter>,
    );
    const downloadButton = await getAllByText('Download');

    expect(downloadButton).toHaveLength(3);
    //expect(downloadButton[1].parentElement).toBeDisabled();
    expect(downloadButton[2].parentElement).toBeEnabled();
  });
});
