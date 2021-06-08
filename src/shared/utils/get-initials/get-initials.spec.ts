import { getIntials } from './get-initials';

describe('getIntials() check', () => {
  test('check correct initial are returned', () => {
    const firstName = 'Hello';
    const surname = 'World';

    const output = getIntials(firstName, surname);

    expect(output).toEqual('HW');
  });
});
