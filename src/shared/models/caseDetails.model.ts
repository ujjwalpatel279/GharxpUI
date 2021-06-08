import { ApplicantInterface } from './applicants.model';

export interface CaseInterface {
  applicants: ApplicantInterface[];
  applicationStatusId: number;
  applicationStatus?: number;
  borrowerType?: number;
  brokerSubmittedDate?: Date;
  caseOfficer?: string;
  customerId: number;
  dateStarted?: Date;
  howSaleWasMade?: number;
  id: number;
  mainApplicationApplicantId?: number;
  intOnlyLoanType?: number;
  isPackagerApplication?: boolean;
  lastUpdated?: Date;
  loanCatagory?: number;
  loanClass?: number;
  mortgageClub?: [];
  network?: [];
  notes?: string;
  organisationId: number;
  packagerClubName?: string;
  packagerFcaNumber?: string;
  packagerNetworkName?: string;
  proVAppStat?: number;
  provisionApplicationId?: number;
  repaymentLoanType?: number;
  retailIndicator?: number;
  loanPurposeId?: number;
}
