import { AnswerInterface } from './answer.model';

interface QuestionListItemInterface {
  id: number;
  value: string;
  code: string;
}

export interface QuestionListInterface {
  [key: string]: QuestionListItemInterface[];
}

export type QuestionType =
  | 'STRING'
  | 'CURRENCY'
  | 'NUMBER'
  | 'BOOL'
  | 'LIST'
  | 'DATE OF BIRTH'
  | 'EMAIL'
  | 'ADDRESS'
  | 'DATE'
  | 'TEXT'
  | 'BOOLEAN';

export interface QuestionInterface {
  id: number;
  name: string;
  dataTypeId?: number;
  dataType: QuestionType;
  questionTypeId?: number;
  questionType?: boolean;
  listTypeId?: number;
  listTypeCode?: string;
  proVisionDestination?: string;
  defaultValue?: ' ';
  readOnly?: boolean;
  showInAdminQueue?: boolean;
  showInSummaryPage?: boolean;
  showOnClientsPage?: boolean;
  ruleCode?: null;
  ruleCategory?: null;
  ruleValue?: null;
  allowMultiple?: boolean;
  customScript?: null;
  formSectionId?: number;
  helpText?: string;
  placeHolder?: string;
  questionId?: number;
  required?: boolean;
  isDisabled?: boolean;
  rowOrder?: number;
  statusId?: number;
  uniqueId?: string;
  wording?: string;
  applicantSpecific?: boolean;
  questionGroupId?: number;
  code?: string;
  parentId?: number;
  parentAnswerValue?: string;
  parentAnswerListsId?: number;
  isChildQuestion?: boolean;
  parentQuestionType?: string;
  parentDataType?: string;
  childQuestionCount?: number;
  value?: string;
}

export interface QuestionSetInterface {
  id?: number;
  allowMultiple?: boolean;
  alternativeText?: string;
  forceRequired?: boolean;
  helpText?: string;
  name?: string;
  rowOrder?: number;
  validationScript?: null;
  verticalLayout?: boolean;
  isFollowedByPageBreak?: boolean;
  questions: QuestionInterface[];
  lists?: QuestionListInterface;
  applicationFormStatus?: number;
  applicationFormStatusDesc?: string;
  isComplete?: boolean;
  answers?: AnswerInterface[];
}
