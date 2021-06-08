import { ApplicationFormStatus } from '../../../../shared/types/enums';
import { SectionInterface } from './section.model';

export interface PageInterface {
  id: number;
  alternateText: string;
  helpText: string;
  name: string;
  rowOrder: number;
  validationScript: string;
  showOnAffordabilityRefer: boolean;
  showOnAffordabilityDecline: boolean;
  showOnQuestionBasedAutoDecline: boolean;
  sections: SectionInterface[];
  applicationFormStatus: ApplicationFormStatus;
  isComplete?: boolean;
}
