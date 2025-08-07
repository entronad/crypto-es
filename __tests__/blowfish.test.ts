/* eslint-disable no-undef */
import C from '../src/index';

const data: any = {};

beforeAll(() => {
  data.saltA = C.enc.Hex.parse('AA00000000000000');
});

describe('blowfish', () => {
  it('encrypt', () => {
    const encryptedA = C.Blowfish.encrypt('Test', 'pass', { salt: data.saltA, hasher: C.algo.SHA256 }).toString();
    expect('U2FsdGVkX1+qAAAAAAAAAKTIU8MPrBdH').toBe(encryptedA);
  });

  it('decrypt', () => {
    const encryptedA = C.Blowfish.encrypt('Test', 'pass', { salt: data.saltA, hasher: C.algo.SHA256 }).toString();
    expect('Test').toBe(C.Blowfish.decrypt(encryptedA, 'pass', {hasher: C.algo.SHA256}).toString(C.enc.Utf8));
  });
});
