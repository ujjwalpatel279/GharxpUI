import { ApplicationStatus } from 'shared/types/enums';

export interface CaseDetail {
  applicationId: number;
  applicationStatus: ApplicationStatus;
  applicationStatusId: number;
  productName: string;
  loanAmount: string;
  ltvValue: string;
  lastUpdatedDate: string;
  firstName: string;
  surname: string;
  telephone: string;
  email: string;
  totalRowCount: number;
  isViewEnable: boolean;
  isContinueEnable: boolean;
}
