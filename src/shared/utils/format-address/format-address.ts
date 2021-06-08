import { AddressInterface } from '../../../shared/models';

export const formatAddress = (address: AddressInterface): string => {
  const propertyNameOrNumber = address.propertyName || address.propertyNumber;
  return `${propertyNameOrNumber}, ${address.road}, ${address.town}, ${address.county}, ${address.postCode}`;
};
