export interface AnswerInterface {
  id?: number;
  rowPosition?: number;
  applicationFormId?: number;
  isMainApplicant?: boolean;
  isRequiredQuestion?: boolean;
  isApplicantSpecificQuestion?: boolean;
  isQuestionAnswered?: boolean;
  isQuestionForThisApplicant?: boolean;
  isComplete?: boolean;
  applicationFormStatus?: number; //ToDo: check why it was a string?
  applicationApplicantId: number;
  formSectionQuestionId: number;
  value: string;
  applicationId?: number;
  autoDecline?: boolean;
  autoRefer?: boolean;
  formFlag?: number;
  dateUpdated?: string;
  applicationFormStatusDesc?: string;
  rowOrder?: number;
  wording?: string;
  dataType?: string;
}
