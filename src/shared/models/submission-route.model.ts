import { SubmissionRouteType } from './submission-route-type';
export interface SubmissionRouteInterface {
  id: number;
  value: string;
  displayText?: string;
  type: SubmissionRouteType;
  selectable?: boolean;
}
