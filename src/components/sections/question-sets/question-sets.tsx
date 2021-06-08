import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { CaseInterface } from './section-menu/case.model';
import { PageInterface } from './section-menu/page.model';
import { SectionMenu } from './section-menu/section-menu';
import { QuestionSet } from './question-set/question-set';
import { ApplicantInterface, QuestionSetInterface } from 'shared/models';
import { Button, Container, PageHeading } from '../../../components/shared';

import { IconNames } from '../../../components/shared/icon/icon';

import './question-sets.scss';
import { WorkflowStepInterface } from '../workflow/workflow.model';
interface sectionMenuInterface {
  pages: PageInterface[];
  steps: WorkflowStepInterface[];
  rootPath: string;
  location?: {
    state?: {
      loanPurposeId: number;
      case?: CaseInterface;
      applicants?: ApplicantInterface[];
    };
  };
  questionSet: QuestionSetInterface;
  workflowName: string;
  caseId: number;
  formId: number;
  inputBoolChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputListChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  addAnother?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  removeLast?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const QuestionSets: FunctionComponent<sectionMenuInterface> = ({
  pages,
  steps,
  rootPath,
  location,
  questionSet,
  workflowName,
  caseId,
  formId,
  inputBoolChangeHandler,
  inputListChangeHandler,
  addAnother,
  removeLast,
}) => {
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
            <QuestionSet
              steps={steps}
              questionSet={questionSet}
              caseId={caseId}
              formId={formId}
              pages={pages}
              location={location}
              inputBoolChangeHandler={inputBoolChangeHandler}
              inputListChangeHandler={inputListChangeHandler}
              addAnother={addAnother}
              removeLast={removeLast}
            />
          </Container>
        </div>
      </div>
    </div>
  );
};
