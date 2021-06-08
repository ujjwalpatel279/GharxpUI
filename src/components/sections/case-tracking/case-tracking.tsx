import React, { FunctionComponent } from 'react';
import { Button, Grid, Pill } from '../../shared';
import { GridColumn, GridRow } from '../../shared/grid/grid';
import { WorkflowStepInterface } from '../workflow/workflow.model';
import { services } from '../../../shared/api/services';
import { Tabs } from '../../sections/tabs/tabs';
import { Tab } from '../../sections/tabs/tab/tab';
import { StageInterface } from 'shared/models';
import { IconNames } from 'components/shared/icon/icon';

import './case-tracking.scss';
import { FormType } from '../../../shared/types/enums';

interface CaseTrackingInterface {
  workflowSteps: WorkflowStepInterface[];
  caseStages: StageInterface[];
  caseId: number;
}

export const CaseTracking: FunctionComponent<CaseTrackingInterface> = ({ workflowSteps, caseStages, caseId }) => {
  const rowData = workflowSteps?.filter((step) => step.id > 1);

  const downloadStageDoc = async (docId: number, stage: string) => {
    buildDownloadLink(`${await services.getDownloadDocumentUrl()}${docId}`, `${stage}-${caseId}.pdf`);
  };

  const downloadApplicationFormDoc = async (formId: number, formType: string) => {
    const documentName = `${formType}-${caseId}.pdf`;
    if (formType === FormType[FormType.DIP] && (await services.isDipCertificateAvailable(caseId, formId))) {
      buildDownloadLink(`${await services.getDownloadCertificateUrl()}${caseId}/${formId}`, documentName);
    } else {
      buildDownloadLink(`${await services.getDownloadFormUrl()}${caseId}/${formId}`, documentName);
    }
  };

  const buildDownloadLink = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
  };

  const columns: GridColumn[] = [
    {
      id: 'formType',
      description: 'Form',
      sort: false,
    },
    {
      id: 'applicationFormStatus',
      description: 'Status',
      render(column: GridColumn, row: GridRow) {
        return <Pill formStatus={row[column.id]}>{row[column.id]}</Pill>;
      },
      sort: false,
    },
    {
      id: 'dateUpdated',
      description: 'Submission Date',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        if (!row[column.id]) return <></>;
        const date: Date = new Date(Date.parse(row[column.id] ?? Date.now));
        return <>{date.toLocaleDateString()}</>;
      },
    },
    {
      id: 'download',
      description: 'Download',
      sort: false,
      render(column: GridColumn, row: WorkflowStepInterface) {
        return (
          <Button
            variant="secondary"
            type="button"
            icon="download"
            iconPosition="left"
            onClick={() => downloadApplicationFormDoc(row.formId, row.formType)}
            disabled={!row.isComplete}
          >
            Download
          </Button>
        );
      },
    },
  ];
  const stageColumns: GridColumn[] = [
    {
      id: 'name',
      description: 'Form',
      sort: false,
    },
    {
      id: 'statusId',
      description: 'Status',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return <Pill stageStatus={row[column.id]}>{row[column.id]}</Pill>;
      },
    },
    {
      id: 'modifiedOn',
      description: 'Submission Date',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        const date: Date = new Date(Date.parse(row[column.id] ?? Date.now));
        return <>{row[column.id] && date.toLocaleDateString()}</>;
      },
    },
    {
      id: 'download',
      description: 'Download',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return (
          <Button
            variant="secondary"
            type="button"
            icon="download"
            iconPosition="left"
            disabled={!row.isComplete}
            onClick={() => downloadStageDoc(row.documentId, row.name)}
          >
            Download
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Tabs id="case-tracking">
        <Tab
          title="Application"
          icon="application"
          showNotification={true}
          extendNotificationClass={!(workflowSteps?.some((step) => !step.isComplete) ?? true) ? 'complete' : 'active'}
        >
          <Grid
            columns={columns}
            rowData={rowData ?? []}
            noRowsMessage="No case tracking details are currently available."
          />
        </Tab>
        {caseStages?.map((stage) => (
          <Tab
            key={`tab-${stage.name}`}
            title={stage.name}
            icon={stage.icon as IconNames}
            showNotification={stage.components?.some((step) => step.modifiedOn != null)}
            extendNotificationClass={
              !(stage.components?.some((step) => !step.isComplete) ?? true) ? 'complete' : 'active'
            }
          >
            <Grid
              columns={stageColumns}
              rowData={stage.components ?? []}
              noRowsMessage="No case tracking details are currently available."
            />
          </Tab>
        ))}
      </Tabs>
    </>
  );
};
