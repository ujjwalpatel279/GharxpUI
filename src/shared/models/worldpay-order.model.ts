import { FeeInterface } from './fee.model';

export interface WorldPayOrderInterface {
  emailAddress: string;
  addressLine1: string;
  city: string;
  postcode: string;
  countryCode: string;
  reference: string;
  fees: FeeInterface[];
  amount: number;
}
