import { Button, Container, PageHeading } from '../../../components/shared';
import { IconNames } from '../../../components/shared/icon/icon';
import React, { useState } from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { ApplicantInterface } from '../applicants/applicant.model';
import { CaseNavigation } from '../case-navigation/case-navigation';
import { CaseInterface, PageInterface } from '../question-sets/section-menu';
import { SectionMenu } from '../question-sets/section-menu/section-menu';
import { WorkflowStepInterface } from '../workflow/workflow.model';
import { DeclarationsTable } from './declarations-table/declarations-table';

interface DeclarationInterface {
  pages: PageInterface[];
  steps: WorkflowStepInterface[];
  rootPath: string;
  workflowName: string;
  location?: {
    state?: {
      loanPurposeId: number;
      case?: CaseInterface;
      applicants?: ApplicantInterface[];
    };
  };
  formId: number;
  caseId: number;
}

export const Declarations: FunctionComponent<DeclarationInterface> = ({
  caseId,
  formId,
  pages,
  steps,
  rootPath,
  workflowName,
  location,
}): ReactElement => {
  const [menuVisible, toggleMenuVisibility] = useState(false);

  return (
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
            workflowName={workflowName}
            closeMenu={toggleMenuVisibility}
          />
        </div>
        <div className="l-question-sets-anchor-bg"></div>
        <div className="l-question-sets__questions">
          <div className="l-question-sets__header">
            <PageHeading headingLevel={2} title={workflowName} icon={workflowName?.toLowerCase() as IconNames} mb={6} />
          </div>
          <Container ctabar>
            <div className="c-question-set">
              <DeclarationsTable pages={pages} steps={steps} location={location} formId={formId} caseId={caseId} />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
