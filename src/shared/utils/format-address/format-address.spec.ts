export interface AddressInterface {
  id?: number;
  propertyName: string;
  propertyNumber?: string;
  road: string;
  town: string;
  county: string;
  postCode: string;
}

import { formatAddress } from './format-address';

describe('formatAddress() check', () => {
  test('check address is corretly formatted when just property name is available', () => {
    const address = {
      propertyName: 'Property Name',
      propertyNumber: '',
      road: 'Road',
      town: 'Town',
      county: 'County',
      postCode: 'NN11NN',
    };

    const output = formatAddress(address);

    expect(output).toEqual('Property Name, Road, Town, County, NN11NN');
  });

  test('check address is corretly formatted when just property number is available', () => {
    const address = {
      propertyName: '',
      propertyNumber: '10',
      road: 'Road',
      town: 'Town',
      county: 'County',
      postCode: 'NN11NN',
    };

    const output = formatAddress(address);

    expect(output).toEqual('10, Road, Town, County, NN11NN');
  });
});
