import { AnswerInterface, QuestionInterface } from 'shared/models';
import { ApplicationFormStatus } from '../../../../shared/types/enums';

export interface ListItemInterface {
  id: number;
  value: string;
  code: string;
  displayText?: string;
}

export interface SectionInterface {
  id: number;
  allowMultiple: boolean;
  alternativeText: string;
  forceRequired: boolean;
  helpText: string;
  name: string;
  rowOrder: number;
  validationScript: string;
  verticalLayout: boolean;
  isFollowedByPageBreak: boolean;
  questions: QuestionInterface[];
  answers?: AnswerInterface[];
  lists: Record<string, ListItemInterface[]>[];
  applicationFormStatus: ApplicationFormStatus;
}

export interface PageRecordInterface {
  page: number;
  section: number;
}
