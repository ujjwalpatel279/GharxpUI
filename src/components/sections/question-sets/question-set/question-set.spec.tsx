import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QuestionSet } from './question-set';
import { AnswerInterface, QuestionInterface, QuestionSetInterface } from '../../../../shared/models';
import { ApplicationFormStatus } from '../../../../shared/types/enums';
import { PageInterface } from '../section-menu/page.model';
import { WorkflowStepInterface } from 'components/sections/workflow/workflow.model';

const mockWorkflowResult: WorkflowStepInterface[] = [
  {
    id: 1,
    formType: `dip`,
    stepOrder: 1,
    isActive: false,
    applicationFormStatus: ApplicationFormStatus.NoData,
    formId: 0,
  },
];

const mockApplicantsSingle = [
  {
    firstName: 'Tom',
    id: '123',
    isMainApplicant: true,
    surname: 'Hanks',
  },
];

const mockApplicantsJoint = [
  {
    firstName: 'Tom',
    id: '123',
    isMainApplicant: false,
    surname: 'Hanks',
  },
  {
    firstName: 'Ross',
    id: '321',
    isMainApplicant: true,
    surname: 'Gellar',
  },
];

const mockLocationSingle = {
  state: {
    loanPurposeId: 1,
    applicants: mockApplicantsSingle,
  },
};

const mockLocationJoint = {
  state: {
    loanPurposeId: 1,
    applicants: mockApplicantsJoint,
  },
};

const mockQuestions: QuestionInterface[] = [
  {
    id: 5678,
    applicantSpecific: true,
    name: 'How old are you?',
    dataType: 'STRING',
    placeHolder: 'howOld',
    required: true,
  },
  {
    id: 6789,
    applicantSpecific: true,
    name: 'Is your name Tom?',
    dataType: 'STRING',
    placeHolder: 'areYouTom',
  },
];

const mockAnswers: AnswerInterface[] = [
  {
    applicationApplicantId: 1,
    formSectionQuestionId: 5678,
    value: '100',
  },
  {
    applicationApplicantId: 1,
    formSectionQuestionId: 6789,
    value: 'sure',
  },
];

const mockQuestionSetA: QuestionSetInterface = {
  id: 577,
  questions: mockQuestions,
  answers: mockAnswers,
};

const mockQuestionSetB: QuestionSetInterface = {
  id: 576,
  questions: mockQuestions,
};

const mockQuestionsTrueFalse: QuestionInterface[] = [
  {
    id: 5678,
    applicantSpecific: false,
    name: 'How old are you?',
    dataType: 'STRING',
  },
  {
    id: 6789,
    applicantSpecific: true,
    name: 'Is your name Tom?',
    dataType: 'STRING',
  },
];

const mockQuestionSetTrueFalse: QuestionSetInterface = {
  questions: mockQuestionsTrueFalse,
};

const mockQuestionsAllFalse: QuestionInterface[] = [
  {
    id: 5678,
    applicantSpecific: false,
    name: 'How old are you?',
    dataType: 'STRING',
  },
  {
    id: 6789,
    applicantSpecific: false,
    name: 'Is your name Tom?',
    dataType: 'STRING',
  },
];

const mockQuestionSetAllFalse: QuestionSetInterface = {
  questions: mockQuestionsAllFalse,
};

const mockPages: PageInterface[] = [
  {
    id: 16,
    alternateText: '',
    name: '',
    helpText: '',
    validationScript: '',
    rowOrder: 0,
    showOnAffordabilityRefer: false,
    showOnAffordabilityDecline: false,
    showOnQuestionBasedAutoDecline: false,
    applicationFormStatus: ApplicationFormStatus.NoData,
    sections: [
      {
        id: 576,
        allowMultiple: false,
        alternativeText: '',
        forceRequired: false,
        helpText: 'A test section',
        name: 'section 1',
        rowOrder: 1,
        validationScript: '',
        verticalLayout: false,
        isFollowedByPageBreak: false,
        questions: undefined,
        lists: undefined,
        applicationFormStatus: ApplicationFormStatus.Complete,
      },
      {
        id: 577,
        allowMultiple: false,
        alternativeText: '',
        forceRequired: false,
        helpText: 'A second test section',
        name: 'section 2',
        rowOrder: 2,
        validationScript: '',
        verticalLayout: false,
        isFollowedByPageBreak: false,
        questions: undefined,
        lists: undefined,
        applicationFormStatus: ApplicationFormStatus.Complete,
      },
      {
        id: 578,
        allowMultiple: false,
        alternativeText: '',
        forceRequired: false,
        helpText: 'A second test section',
        name: 'section 2',
        rowOrder: 2,
        validationScript: '',
        verticalLayout: false,
        isFollowedByPageBreak: false,
        questions: undefined,
        lists: undefined,
        applicationFormStatus: ApplicationFormStatus.Complete,
      },
    ],
  },
];

describe('question-set component', () => {
  afterEach(cleanup);

  test('correct single applicant name & questions are displayed', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <QuestionSet
          questionSet={mockQuestionSetA}
          steps={mockWorkflowResult}
          caseId={0}
          formId={0}
          pages={mockPages}
          location={mockLocationSingle}
        />
      </BrowserRouter>,
    );
    expect(getByText('Tom Hanks (Main Applicant)')).toBeInTheDocument();
    expect(getByText('Is your name Tom?')).toBeInTheDocument();
    expect(getByText('How old are you?')).toBeInTheDocument();
  });
  test('correct applicants are displayed & all questions if all set to applicantSpecific: true', async () => {
    const { getByText, getAllByText } = render(
      <BrowserRouter>
        <QuestionSet
          questionSet={mockQuestionSetA}
          steps={mockWorkflowResult}
          caseId={0}
          formId={0}
          pages={mockPages}
          location={mockLocationJoint}
        />
      </BrowserRouter>,
    );
    expect(getByText('Ross Gellar (Main Applicant)')).toBeInTheDocument();
    expect(getByText('Tom Hanks (Applicant 2)')).toBeInTheDocument();
    const x = getAllByText('Is your name Tom?');
    expect(x).toHaveLength(2);
    const y = getAllByText('How old are you?');
    expect(y).toHaveLength(2);
  });

  test('correct applicants are displayed & correct questions depending on applicantSpecific: true/false', async () => {
    const { getByText, getAllByText } = render(
      <BrowserRouter>
        <QuestionSet
          questionSet={mockQuestionSetTrueFalse}
          steps={mockWorkflowResult}
          caseId={0}
          formId={0}
          pages={mockPages}
          location={mockLocationJoint}
        />
      </BrowserRouter>,
    );
    expect(getByText('Ross Gellar (Main Applicant)')).toBeInTheDocument();
    expect(getByText('Tom Hanks (Applicant 2)')).toBeInTheDocument();
    const x = getAllByText('Is your name Tom?');
    expect(x).toHaveLength(2);
    const y = getAllByText('How old are you?');
    expect(y).toHaveLength(1);
  });

  test('correct applicants are displayed & correct questions when applicantSpecific: false', async () => {
    const { getByText, getAllByText, queryByText } = render(
      <BrowserRouter>
        <QuestionSet
          questionSet={mockQuestionSetAllFalse}
          steps={mockWorkflowResult}
          caseId={0}
          formId={0}
          pages={mockPages}
          location={mockLocationJoint}
        />
      </BrowserRouter>,
    );
    expect(getByText('Ross Gellar (Main Applicant)')).toBeInTheDocument();
    expect(queryByText('Tom Hanks (Applicant 2)')).not.toBeInTheDocument();
    const x = getAllByText('Is your name Tom?');
    expect(x).toHaveLength(1);
    const y = getAllByText('How old are you?');
    expect(y).toHaveLength(1);
  });

  test('only the button for the next page is visible when on the first section', async () => {
    const { getByText, queryByText } = render(
      <BrowserRouter>
        <QuestionSet
          questionSet={mockQuestionSetB}
          steps={mockWorkflowResult}
          caseId={0}
          formId={0}
          pages={mockPages}
          location={mockLocationSingle}
        />
      </BrowserRouter>,
    );
    const nextButton = getByText('Next');
    const backButton = queryByText('Previous');
    expect(nextButton).toBeInTheDocument();
    expect(backButton).not.toBeInTheDocument();
  });

  test('only the button for the next page is visible when on the first section', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <QuestionSet
          questionSet={mockQuestionSetA}
          steps={mockWorkflowResult}
          caseId={0}
          formId={0}
          pages={mockPages}
          location={mockLocationSingle}
        />
      </BrowserRouter>,
    );
    const nextButton = getByText('Next');
    expect(nextButton).toBeInTheDocument();
  });

  test('input has the required attribute if question is required', async () => {
    const { queryByPlaceholderText } = render(
      <BrowserRouter>
        <QuestionSet
          questionSet={mockQuestionSetA}
          steps={mockWorkflowResult}
          caseId={0}
          formId={0}
          pages={mockPages}
          location={mockLocationSingle}
        />
      </BrowserRouter>,
    );
    const inputOne = queryByPlaceholderText('howOld').hasAttribute('required');
    expect(inputOne).toBe(true);

    const inputTwo = queryByPlaceholderText('areYouTom').hasAttribute('required');
    expect(inputTwo).toBe(false);
  });
});
