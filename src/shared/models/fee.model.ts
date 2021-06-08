export interface FeeInterface {
  productFeeId: number;
  amount: number;
  feeCode?: string;
  feeId: number;
  isAddedToErc?: boolean;
  isAddedToLoan?: boolean;
  isAddedToTotal?: boolean;
  isFixed?: boolean;
  isFixedRefund?: boolean;
  isIncludedInApr?: boolean;
  isMaxLtvExceedable?: boolean;
  isRefundable?: boolean;
  loanToValueBandId: number;
  loanToValueFeeId: number;
  maxLoanToValue?: number;
  maximumAddableFee?: number;
  name: string;
  payableOn: string;
  refundAmount?: number;
  refundPercentage?: string;
  refundText?: string;
  selected?: boolean;
  isPaid?: boolean;
}
