import React, { FunctionComponent, useState, useEffect, ReactElement, ChangeEvent } from 'react';
import { DeclarationInterface } from './declarations.model';
import { Grid, InputCheckbox } from '../../../shared';
import { GridColumn, GridRow } from '../../../shared/grid/grid';

import './declarations-table.scss';
import { services } from '../../../../shared/api/services';
import { CaseInterface, PageInterface } from '../../../sections/question-sets/section-menu';
import { WorkflowStepInterface } from '../../../sections/workflow/workflow.model';
import { ApplicantInterface } from '../../../sections/applicants/applicant.model';
import { CaseNavigation } from '../../../sections/case-navigation/case-navigation';
import { useHistory } from 'react-router-dom';

interface DeclarationsTableInterface {
  formId: number;
  caseId: number;
  pages: PageInterface[];
  steps: WorkflowStepInterface[];
  location?: {
    state?: {
      loanPurposeId: number;
      case?: CaseInterface;
      applicants?: ApplicantInterface[];
    };
  };
  data?: DeclarationInterface[];
}

export const DeclarationsTable: FunctionComponent<DeclarationsTableInterface> = ({
  caseId,
  formId,
  data,
  pages,
  steps,
  location,
}): ReactElement => {
  const [declarations, setDeclarations] = useState<DeclarationInterface[]>([]);
  const [documentUrl, setDocumentUrl] = useState<string>();
  const [nextPage, setNextPage] = useState<any>();
  const history = useHistory();

  const columns = [
    {
      id: 'name',
      description: 'Declaration',
    },
    {
      id: 'confirm',
      description: 'Confirm',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return (
          <InputCheckbox
            id={'viewed_' + row.declarationDocumentId}
            defaultValue={row.accepted}
            dataValue={row.declarationDocumentId}
            onToggle={setDocumentViewed}
          />
        );
      },
    },
    {
      id: 'view',
      description: 'View',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return (
          <a href={documentUrl + row.declarationDocumentId} target="_blank" rel="noreferrer">
            View
          </a>
        );
      },
    },
  ];

  const setDocumentViewed: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const id = e.currentTarget.getAttribute('data-value');
    const docs = [...declarations];
    docs.filter((d) => d.declarationDocumentId === Number(id))[0].accepted = e.currentTarget.checked;
    setDeclarations(docs);
  };

  const saveDeclarationStatus = async () => {
    const declarationIds = declarations.map((d) => d.declarationDocumentId);
    await services.saveDeclarations(caseId, formId, declarationIds).then(() => {
      fetchDocuments(caseId, formId);
      history.push(nextPage.path, location.state);
    });
  };

  const fetchDocuments = async (caseId: number, formId: number) => {
    setDeclarations(data ?? (await services.getDeclarations(caseId, formId)).data ?? []);
  };

  useEffect(() => {
    if (caseId && formId) fetchDocuments(caseId, formId);
    setDocumentUrl(services.getDeclarationDocumentUrl());
  }, [caseId, formId]);

  return (
    <>
      <div>
        <div className="u-fs-3 u-mb-4">Declarations</div>
        <span className="u-fs-2">
          Please view each declaration and tick to confirm that you have read and agreed to each one.
        </span>
        <Grid pinned={'right'} rowData={declarations} columns={columns} noRowsMessage="No existing declarations" />
      </div>
      <CaseNavigation
        pages={pages}
        workflowSteps={steps}
        location={location}
        setTargetPage={setNextPage}
        onNextClick={saveDeclarationStatus}
        nextDisabled={declarations.filter((d) => !d.accepted).length > 0}
      />
    </>
  );
};
