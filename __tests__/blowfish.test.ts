/* eslint-disable no-undef */
import { Blowfish, Hex, SHA256Algo, Utf8 } from '../src/index';

const data: any = {};

beforeAll(() => {
  data.saltA = Hex.parse('AA00000000000000');
});

describe('blowfish', () => {
  it('encrypt', () => {
    const encryptedA = Blowfish.encrypt('Test', 'pass', { salt: data.saltA, hasher: SHA256Algo }).toString();
    expect('U2FsdGVkX1+qAAAAAAAAAKTIU8MPrBdH').toBe(encryptedA);
  });

  it('decrypt', () => {
    const encryptedA = Blowfish.encrypt('Test', 'pass', { salt: data.saltA, hasher: SHA256Algo }).toString();
    expect('Test').toBe(Blowfish.decrypt(encryptedA, 'pass', {hasher: SHA256Algo}).toString(Utf8));
  });
});
