import React, { FunctionComponent, ReactElement, useState, useEffect, ChangeEvent } from 'react';
import { Route, useParams } from 'react-router-dom';
import { services } from '../../../shared';

import { APPLICATION, FEES, CASEDOCUMENTS, CASEDECLARATIONS, ILLUSTRATION } from '../../../config/routes';
import { Workflow } from '../../sections/workflow/workflow';

import { Documents, Fees, QuestionSets, Declarations, Illustrations } from '../../sections';
import { WorkflowStepInterface } from '../../sections/workflow/workflow.model';
import { CaseInterface } from '../../sections/question-sets/section-menu/case.model';
import { PageInterface } from '../../sections/question-sets/section-menu/page.model';
import { ApplicantInterface, AutoDeclineAnswerInterface, QuestionSetInterface } from 'shared/models';

import { defaultErrorResponse, hasError, ServiceHandlingInterface } from '../../../shared/types/service-handling';

interface ApplicationPageInterface {
  location?: {
    state?: {
      loanPurposeId: number;
      case?: CaseInterface;
      applicants?: ApplicantInterface[];
    };
  };
}
interface UrlParamInterface {
  caseId?: string;
  sectionId?: string;
  loanPurposeId?: string;
}

export const QuestionSetInitialState: ServiceHandlingInterface<QuestionSetInterface> = {
  data: undefined,
  loading: false,
  error: false,
};

export const getCaseInitialState: ServiceHandlingInterface<CaseInterface> = {
  data: undefined,
  loading: false,
  error: false,
};

export const ApplicationPage: FunctionComponent<ApplicationPageInterface> = ({ location }): ReactElement => {
  const { caseId, sectionId, loanPurposeId } = useParams<UrlParamInterface>();
  const [pages, setPages] = useState<PageInterface[]>([]);
  const [workflowStep, setWorkflowStep] = useState<WorkflowStepInterface>();
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStepInterface[]>();
  const [questionSet, setQuestionSet] = useState<QuestionSetInterface>();
  const [autoDeclineAnswers, setAutoDeclineAnswers] = useState<AutoDeclineAnswerInterface[]>();
  const [activeLoanPurposeId, setActiveLoanPurposeId] = useState<number>();
  const [shQuestionSet, setShQuestionSet] = useState<ServiceHandlingInterface<QuestionSetInterface>>(
    QuestionSetInitialState,
  );
  const [shGetCase, setShGetCase] = useState<ServiceHandlingInterface<CaseInterface>>(getCaseInitialState);

  const fetchQuestionSet = async (caseId: number, sectionId: number) => {
    setShQuestionSet({ ...shQuestionSet, loading: true });
    const questionSetData = await services.getQuestionSets(caseId, sectionId);
    setShQuestionSet(questionSetData);
    if (questionSetData.data) setQuestionSet(questionSetData.data);
  };

  const fetchAutoDeclineAnswers = async (sectionId: number) => {
    const autoDeclines: AutoDeclineAnswerInterface[] = (await services.getAutoDeclineAnswers(sectionId)).data;
    setAutoDeclineAnswers(autoDeclines);
  };

  const fetchPageWithStatus = async (caseId: number, formId: number) => {
    const pageWithStatus: PageInterface[] = (await services.getPagesWithStatus(caseId, formId)).data;
    setPages(pageWithStatus);
    const sections = pageWithStatus ? pageWithStatus[0]?.sections ?? [] : [];
    return sectionId && sectionId.length > 0 ? Number(sectionId) : sections[0]?.id ?? 0;
  };

  const fetchData = async () => {
    const currentCase = location?.state?.case?.id ?? Number(caseId);
    const currentLoanPurpose =
      activeLoanPurposeId ??
      location?.state?.loanPurposeId ??
      location?.state?.case?.loanPurposeId ??
      Number(loanPurposeId);

    if (!currentLoanPurpose) {
      setShGetCase({ ...shGetCase, loading: true });
      const caseDetailsData = await services.getCase(currentCase);
      setShGetCase(caseDetailsData);
      if (caseDetailsData.data) setActiveLoanPurposeId(caseDetailsData.data.loanPurposeId);
    } else if (!activeLoanPurposeId) {
      setActiveLoanPurposeId(currentLoanPurpose);
    }

    if (workflowStep) {
      const pageWithStatus = await fetchPageWithStatus(currentCase, workflowStep.formId);
      await fetchQuestionSet(currentCase, pageWithStatus);
      await fetchAutoDeclineAnswers(pageWithStatus);
    }
  };

  const getApplicationApplicantIdFromElementName = (elName: string): number => {
    return Number(elName.split('-')[0]);
  };

  const getQuestionIdFromElementName = (elName: string): number => {
    return Number(elName.split('-')[1]);
  };

  const getRowPositionFromElementName = (elName: string): number => {
    return Number(elName.split('-')[2]);
  };

  const setAutoDeclineRefer = (
    elementId: string,
    selectedSection: QuestionSetInterface,
    elementValue?: string,
    elementListsId?: number,
  ) => {
    const qId = getQuestionIdFromElementName(elementId);
    const applicationApplicantId = getApplicationApplicantIdFromElementName(elementId);
    const rowPosition = getRowPositionFromElementName(elementId);

    const matchedAutoDecline = autoDeclineAnswers?.filter((q) => q.formSectionQuestionId === qId);

    const matched =
      matchedAutoDecline.length > 0 && elementValue
        ? matchedAutoDecline[0]?.value === elementValue
        : elementListsId
        ? matchedAutoDecline[0]?.listsId === elementListsId
        : false;
    if (matched) {
      setAnswer(
        qId,
        applicationApplicantId,
        elementValue ? elementValue : elementListsId ? elementListsId.toString() : '',
        selectedSection,
        matchedAutoDecline[0].refer === true,
        matchedAutoDecline[0].refer === false,
        rowPosition,
      );
    } else {
      setAnswer(
        qId,
        applicationApplicantId,
        elementValue ? elementValue : elementListsId ? elementListsId.toString() : '',
        selectedSection,
        false,
        false,
        rowPosition,
      );
    }
    setQuestionSet(selectedSection);
  };

  const setAnswer = (
    questionId: number,
    applicationApplicantId: number,
    elementValue: string,
    selectedSection: QuestionSetInterface,
    autoRefer: boolean,
    autoDecline: boolean,
    rowPosition?: number,
  ) => {
    const answer = selectedSection.answers?.find(
      (a) =>
        a.formSectionQuestionId === questionId &&
        a.rowPosition === rowPosition &&
        a.applicationApplicantId === applicationApplicantId,
    );
    if (!answer)
      selectedSection.answers.push({
        applicationApplicantId: applicationApplicantId,
        formSectionQuestionId: questionId,
        value: elementValue,
        rowPosition: rowPosition ?? 1,
        autoRefer: autoRefer,
        autoDecline: autoDecline,
        applicationId: Number(location?.state?.case?.id),
      });
    else {
      answer.value = elementValue;
      answer.autoDecline = autoDecline;
      answer.autoRefer = autoRefer;
      answer.rowPosition = rowPosition;
    }
  };

  const addAnother: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
    const selectedSection = Object.assign({}, questionSet);
    const dataValues = e.currentTarget.getAttribute('data-value').split('|');
    const applicationApplicantId = Number(dataValues[0]);
    const formSectionQuestionId = Number(dataValues[1]);
    const answersToQuestion = selectedSection.answers?.filter(
      (ans) =>
        ans.formSectionQuestionId === formSectionQuestionId && ans.applicationApplicantId === applicationApplicantId,
    );

    if (answersToQuestion?.length === 0) {
      setAnswer(formSectionQuestionId, applicationApplicantId, '', selectedSection, false, false, 1);
    }
    setAnswer(
      formSectionQuestionId,
      applicationApplicantId,
      '',
      selectedSection,
      false,
      false,
      selectedSection.answers?.filter((ans) => ans.formSectionQuestionId === formSectionQuestionId).length + 1,
    );

    setQuestionSet(selectedSection);
  };

  const removeLast: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
    const selectedSection = Object.assign({}, questionSet);
    const dataValues = e.currentTarget.getAttribute('data-value').split('|');
    const applicationApplicantId = Number(dataValues[0]);
    const formSectionQuestionId = Number(dataValues[1]);
    const answersToQuestion = selectedSection.answers?.filter(
      (ans) => ans.formSectionQuestionId === formSectionQuestionId,
    );

    if (answersToQuestion?.length > 1) {
      const ansToRemove = selectedSection.answers?.find(
        (a) =>
          a.applicationApplicantId === applicationApplicantId &&
          a.formSectionQuestionId === formSectionQuestionId &&
          a.rowPosition === answersToQuestion.length + 1,
      );
      selectedSection.answers.splice(selectedSection.answers.indexOf(ansToRemove), 1);
    }

    setQuestionSet(selectedSection);
  };

  const inputBoolChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const selectedSection = Object.assign({}, questionSet);
    const elementName = e.currentTarget.name;
    const elementValue = e.currentTarget.value;
    const parentQuestion =
      selectedSection.questions.filter((q) => elementName.endsWith(q.id.toString())).length > 0 &&
      selectedSection.questions.filter((q) => elementName.endsWith(q.id.toString()))[0];
    const parentQuestionChildCount = parentQuestion?.childQuestionCount;

    setAutoDeclineRefer(elementName, selectedSection, elementValue.toLowerCase() === 'yes' ? 'true' : 'false');

    if (parentQuestionChildCount > 0) {
      const applicationApplicantId = getApplicationApplicantIdFromElementName(elementName);
      const parentFormSectionQuestionId = getQuestionIdFromElementName(elementName);
      const childQuestions =
        selectedSection.questions.filter((q) => q.parentId && parentFormSectionQuestionId === q.parentId) &&
        selectedSection.questions.filter((q) => q.parentId && parentFormSectionQuestionId === q.parentId);
      const displayChildQuestions =
        elementValue.toLowerCase() == (childQuestions[0]?.parentAnswerValue == 'true' ? 'yes' : 'no'); //problem here with parentAnswerValue
      const parentAnswer = selectedSection.answers.filter(
        (a) => a.formSectionQuestionId === parentFormSectionQuestionId,
      );

      parentAnswer.length > 0
        ? (parentAnswer[0].value = displayChildQuestions.toString())
        : selectedSection.answers.push({
            id: parentQuestion.id,
            applicationApplicantId: applicationApplicantId,
            formSectionQuestionId: parentFormSectionQuestionId,
            value: displayChildQuestions.toString(),
            applicationId: Number(location?.state?.case?.id),
          });
      setQuestionSet(selectedSection);
    }
  };

  const getListOptionValue: (input: HTMLInputElement | HTMLSelectElement) => string = (input) => {
    return (input as HTMLSelectElement)?.selectedOptions?.length > 0
      ? (input as HTMLSelectElement)?.selectedOptions[0].value
      : input.id;
  };

  const inputListChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void = (e) => {
    const selectedSection = Object.assign({}, questionSet);
    const elementName = e.currentTarget.name;
    const elementValue = getListOptionValue(e.currentTarget);
    const parentQuestion =
      selectedSection.questions.filter((q) => elementName.endsWith(q.id.toString())).length > 0 &&
      selectedSection.questions.filter((q) => elementName.endsWith(q.id.toString()))[0];

    const applicationApplicantId = Number(elementName.split('-')[0]);
    const parentFormSectionQuestionId = Number(elementName.split('-')[1]);
    const parentAnswer = selectedSection.answers.filter((a) => a.formSectionQuestionId === parentFormSectionQuestionId);

    setAutoDeclineRefer(elementName, selectedSection, undefined, Number(elementValue));

    parentAnswer.length > 0
      ? (parentAnswer[0].value = elementValue)
      : (e.currentTarget as HTMLSelectElement)?.selectedOptions?.length > 0
      ? selectedSection.answers.push({
          id: parentQuestion.id,
          applicationApplicantId: applicationApplicantId,
          formSectionQuestionId: parentFormSectionQuestionId,
          value: elementValue,
          applicationId: Number(location?.state?.case?.id),
        })
      : selectedSection.answers.push({
          id: parentQuestion.id,
          applicationApplicantId: applicationApplicantId,
          formSectionQuestionId: parentFormSectionQuestionId,
          value: elementValue,
          applicationId: Number(location?.state?.case?.id),
        });
    setQuestionSet(selectedSection);
  };
  ``;
  const activeCaseId = location?.state?.case?.id ?? Number(caseId);
  const activeFormId = workflowStep?.formId ?? 0;

  const setState = async () => {
    if (caseId && activeLoanPurposeId) {
      const activeCase = location?.state?.case ?? (await services.getCase(Number(caseId))).data;
      location.state = location.state ?? {
        applicants: activeCase.applicants,
        case: activeCase,
        loanPurposeId: activeLoanPurposeId,
      };
    }
  };
  const rootPath = `${APPLICATION.paths[0]}/${location?.state?.case?.id ?? caseId}/${activeLoanPurposeId}/${
    workflowStep?.formId
  }/`;

  useEffect(() => {
    setState();
    fetchData();
  }, [caseId, workflowStep]);

  if (hasError([shQuestionSet])) {
    return defaultErrorResponse();
  }

  if (hasError([shGetCase])) {
    return defaultErrorResponse();
  }

  return (
    <>
      <Workflow
        caseId={location?.state?.case?.id ?? Number(caseId)}
        loanPurposeId={activeLoanPurposeId}
        setActiveWorkflowStep={setWorkflowStep}
        setWorkflowSteps={setWorkflowSteps}
      />
      <Route exact path={FEES.paths}>
        <Fees
          pages={pages}
          steps={workflowSteps}
          rootPath={rootPath}
          location={location}
          caseId={activeCaseId}
          formId={activeFormId}
          workflowName={workflowStep?.formType}
        />
      </Route>
      <Route exact path={CASEDOCUMENTS.paths}>
        <Documents
          pages={pages}
          steps={workflowSteps}
          rootPath={rootPath}
          location={location}
          caseId={activeCaseId}
          loanPurposeId={activeLoanPurposeId}
          formId={activeFormId}
          workflowName={workflowStep?.formType}
        />
      </Route>
      <Route exact path={CASEDECLARATIONS.paths}>
        <Declarations
          pages={pages}
          steps={workflowSteps}
          rootPath={rootPath}
          location={location}
          caseId={activeCaseId}
          formId={activeFormId}
          workflowName={workflowStep?.formType}
        />
      </Route>
      <Route path={APPLICATION.paths} exact>
        <QuestionSets
          pages={pages}
          steps={workflowSteps}
          rootPath={rootPath}
          location={location}
          questionSet={questionSet}
          caseId={Number(location?.state?.case?.id ?? caseId) ?? 0}
          formId={workflowStep?.formId ?? 0}
          inputBoolChangeHandler={inputBoolChangeHandler}
          inputListChangeHandler={inputListChangeHandler}
          addAnother={addAnother}
          workflowName={workflowStep?.formType}
          removeLast={removeLast}
        />
      </Route>
      <Route exact path={ILLUSTRATION.path}>
        <Illustrations
          location={location}
          pages={pages}
          steps={workflowSteps}
          rootPath={rootPath}
          caseId={activeCaseId}
          loanPurposeId={activeLoanPurposeId}
          workflowName={workflowStep?.formType}
          formId={activeFormId}
        />
      </Route>
    </>
  );
};
