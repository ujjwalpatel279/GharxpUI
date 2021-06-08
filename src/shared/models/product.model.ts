export interface ProductInterface {
  productId: number;
  productTypeId: number;
  fixed: boolean;
  isProductRateAdjustmentNegative: boolean;
  rateAdjustment: number;
  baseRate: number;
  description: string;
  loanPurpose: string;
  schemeCode: string;
  productCode: string;
  loanMasterCode: string;
  rate: number;
  isRegulated: boolean;
  initialRate: number;
  standardVariableRate: number;
  maximumLoanToValue: number;
  minimumLoanToValue: number;
  productFee: number;
  isProductFeeFixed: boolean;
  isErc: string;
  ltv?: string;
  erc: number;
  url?: string;
  repaymentStrategyId?: number;
  interestOnlyAmount: number;
  pageCount?: number;
}
