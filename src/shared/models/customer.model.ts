import { AddressInterface } from './address.model';
export interface CustomerDetailInterface {
  id?: number;
  firstName: string;
  surname: string;
  titleId: number;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
  address: AddressInterface;
  correspondenceAddress: AddressInterface;
}
