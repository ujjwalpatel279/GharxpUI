import { APPLICATION } from '../../../config/routes';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { services } from '../../../shared';
import { Button, CtaBar, Icon } from '../../shared';
import { ApplicantInterface } from '../applicants/applicant.model';
import { CaseInterface } from '../question-sets/section-menu/case.model';
import { PageInterface } from '../question-sets/section-menu/page.model';
import { WorkflowStepInterface, WorkflowStepFormType } from '../workflow/workflow.model';
import { SectionInterface } from '../question-sets/section-menu';

interface CaseNavigationInterface {
  pages: PageInterface[];
  workflowSteps: WorkflowStepInterface[];
  setTargetPage?: (nextPage: NavPageInterface) => void;
  location?: {
    state?: {
      loanPurposeId: number;
      case?: CaseInterface;
      applicants?: ApplicantInterface[];
    };
  };
  onNextClick?: () => void;
  nextDisabled?: boolean;
  useFormSubmit?: boolean;
  nextPageStep?: NavPageInterface;
}

export interface NavPageInterface {
  pageId: number;
  sectionId?: number;
  path: string;
  name: string;
}
interface UrlParamInterface {
  caseId?: string;
  pageId?: string;
  sectionId?: string;
  loanPurposeId?: string;
  formId?: string;
}

export const CaseNavigation: FunctionComponent<CaseNavigationInterface> = ({
  pages,
  location,
  setTargetPage,
  workflowSteps,
  nextDisabled,
  onNextClick,
  useFormSubmit,
  nextPageStep,
}) => {
  const { sectionId, caseId, loanPurposeId, formId } = useParams<UrlParamInterface>();
  const [nextPage, setNextPage] = useState<NavPageInterface>();
  const [previousPage, setPreviousPage] = useState<NavPageInterface>();
  const history = useHistory();

  const completionStage = 'Complete Full Mortgage Application';
  const currentCase = location?.state?.case?.id ?? Number(caseId);
  const caseLoanPurpose = location?.state?.loanPurposeId ?? Number(loanPurposeId);

  const triggerNextPage = () => {
    history.push(nextPage.path, location.state);
  };

  const pushNextPage = (page: NavPageInterface) => {
    if (page) {
      setNextPage(nextPageStep ?? page);
      if (setTargetPage) setTargetPage(page);
    }
  };

  const manageNextLink = (currentPage: number, currentStep: number, pagesList: NavPageInterface[]) => {
    if (currentPage < pagesList.length - 1) {
      if (workflowSteps[currentStep]?.formTypeId == 3 && currentPage == pagesList.length - 2) {
        const returnPage = pagesList[currentPage + 1];
        returnPage.name = 'Submit';
        pushNextPage(returnPage);
      } else {
        pushNextPage(pagesList[currentPage + 1]);
      }
    } else {
      if (currentStep < workflowSteps.length - 1) {
        services.getPages(workflowSteps[currentStep + 1]?.formId ?? Number(formId)).then((result) => {
          if (result)
            pushNextPage(createNavPage(workflowSteps[currentStep + 1], result.data[0], result.data[0]?.sections[0]));
        });
      } else {
        pushNextPage({
          sectionId: 0,
          pageId: 0,
          path: `${APPLICATION.paths[0]}/${currentCase}/${caseLoanPurpose}/${workflowSteps[currentStep]?.formId}/Complete`,
          name: completionStage,
        });
      }
    }
  };

  const managePreviouseLink = (currentPage: number, currentStep: number, pagesList: NavPageInterface[]) => {
    if (currentPage == 0) {
      services.getPages(workflowSteps[currentStep - 1]?.formId).then((result) => {
        if (result)
          setPreviousPage(createNavPage(workflowSteps[currentStep - 1], result.data[0], result.data[0]?.sections[0]));
      });
    } else {
      setPreviousPage(pagesList[currentPage - 1]);
    }
  };

  const createNavPage = (step: WorkflowStepInterface, page: PageInterface, section?: SectionInterface) => {
    return {
      sectionId: section?.id ?? 0,
      pageId: page.id,
      path: section
        ? `${APPLICATION.paths[0]}/${currentCase}/${caseLoanPurpose}/${step?.formId}/${page.id}/${section.id}`
        : `${APPLICATION.paths[0]}/${currentCase}/${caseLoanPurpose}/${step?.formId}/${page.name}`,
      status: page.applicationFormStatus,
      name: section?.name ?? page.name,
    };
  };

  useEffect(() => {
    if (workflowSteps) {
      const currentStep = workflowSteps.findIndex((step) => step.isActive);
      const splitPath = history.location.pathname.split('/');
      const name = splitPath[splitPath.length - 1];
      const pagesList: NavPageInterface[] = pages.flatMap(
        (page) =>
          page.sections?.map((section) => {
            return createNavPage(workflowSteps[currentStep], page, section);
          }) ?? [createNavPage(workflowSteps[currentStep], page)],
      );

      let currentPage = pagesList.findIndex(
        (record) => record?.sectionId == Number(sectionId ?? name) || record?.name == name,
      );
      currentPage = currentPage < 0 ? 0 : currentPage;

      managePreviouseLink(currentPage, currentStep, pagesList);
      manageNextLink(currentPage, currentStep, pagesList);
    }
  }, [pages, workflowSteps, caseId]);

  return (
    <CtaBar>
      {previousPage && (
        <Link
          to={{
            pathname: previousPage.path,
            state: location.state,
          }}
          className="c-btn c-btn--outline c-btn--icon-left"
        >
          <Icon name="arrowLeft" />
          <span className="c-question-set__previous-question">{previousPage.name}</span>
          <span className="c-question-set__previous">Previous</span>
        </Link>
      )}
      {nextPage && (
        <Button
          type={useFormSubmit ? 'submit' : 'button'}
          variant="primary"
          icon="arrowRight"
          iconPosition="right"
          childClasses="c-form-submission"
          onClick={useFormSubmit ? null : onNextClick ?? triggerNextPage}
          disabled={nextDisabled}
        >
          <span className="c-question-set__next-question">{nextPage.name}</span>
          <span className="c-question-set__next">Next</span>
        </Button>
      )}
    </CtaBar>
  );
};
