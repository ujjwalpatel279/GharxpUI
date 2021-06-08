import React, { FunctionComponent, useEffect, useState } from 'react';
import { CaseInterface } from '../question-sets/section-menu/case.model';
import { PageInterface } from '../question-sets/section-menu/page.model';
import { SectionMenu } from '../question-sets/section-menu/section-menu';
import { ApplicantInterface } from 'shared/models';
import { Button, Container, PageHeading } from '../../../components/shared';

import { IconNames } from '../../../components/shared/icon/icon';
import '../question-sets/question-sets.scss';

import { WorkflowStepInterface } from '../workflow/workflow.model';
import { services } from '../../../shared';
import { FeeInterface } from '../../../shared/models';
import { CaseNavigation } from '../case-navigation/case-navigation';
import { AddFees, FeeType } from './add-fees/add-fees';
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
  workflowName: string;
  caseId: number;
  formId: number;
}

export const Fees: FunctionComponent<sectionMenuInterface> = ({
  pages,
  steps,
  rootPath,
  location,
  workflowName,
  caseId,
  formId,
}) => {
  const [menuVisible, toggleMenuVisibility] = useState(false);
  const [fees, setFees] = useState<FeeInterface[]>([]);
  const [isWorldPayProviderActive, setIsWorldPayProviderActive] = useState<boolean>();

  const reloadGrids = async (caseId: number, formId: number) => {
    setFees((await services.getFees(caseId, formId)).data);
  };

  const fetchData = async () => {
    reloadGrids(caseId, formId);
    setIsWorldPayProviderActive((await services.isWorldPayProviderActive()).data);
  };

  useEffect(() => {
    fetchData();
  }, [caseId]);

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
              <AddFees
                caseId={location?.state?.case?.id ?? Number(caseId)}
                formId={formId}
                heading={'Fees that can be added to the loan amount'}
                noRowsMessage={`No fees can be added to this loan`}
                feeType={FeeType.AddToLoan}
                feeData={fees?.filter((f) => f.isAddedToLoan && !f.isPaid)}
                reloadGrids={reloadGrids}
              />
              {isWorldPayProviderActive && (
                <AddFees
                  caseId={location?.state?.case?.id ?? Number(caseId)}
                  formId={formId}
                  feeData={fees?.filter((f) => !f.selected && f.payableOn === 'On Application')}
                  heading={'Fees to pay now'}
                  noRowsMessage={'No fees to pay now'}
                  feeType={FeeType.PayableNow}
                  reloadGrids={reloadGrids}
                />
              )}
              <CaseNavigation pages={pages} workflowSteps={steps} location={location} />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
