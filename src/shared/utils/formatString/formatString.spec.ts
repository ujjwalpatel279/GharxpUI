import { formatString } from './formatString';

describe('formatString() check', () => {
  test('check whitespace is removed & is in lowercase format', () => {
    const input = 'Hello World';
    const output = formatString(input);

    expect(output).toEqual('helloworld');
  });

  test('check whitespace is removed & in lowercase in a longer string', () => {
    const input = 'Hello WORLD carrot POtaTO';
    const output = formatString(input);

    expect(output).toEqual('helloworldcarrotpotato');
  });
});
