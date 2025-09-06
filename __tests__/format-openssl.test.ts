/* eslint-disable no-undef */
/* eslint-disable max-len */
import { Base64, CipherParams, Latin1, OpenSSLFormatter, WordArray } from '../src/index';

const data: any = {};

beforeAll(() => {
  data.ciphertext = WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);
  data.salt = WordArray.create([0x01234567, 0x89abcdef]);
});

describe('format-openssl', () => {
  it('salted to string', () => {
    expect(OpenSSLFormatter.stringify(CipherParams.create({ ciphertext: data.ciphertext, salt: data.salt })))
      .toBe(Latin1.parse('Salted__').concat(data.salt).concat(data.ciphertext).toString(Base64));
  });

  it('unSalted to string', () => {
    expect(OpenSSLFormatter.stringify(CipherParams.create({ ciphertext: data.ciphertext })))
      .toBe(data.ciphertext.toString(Base64));
  });

  it('salted from string', () => {
    const openSSLStr = OpenSSLFormatter.stringify(CipherParams.create({ ciphertext: data.ciphertext, salt: data.salt }));
    const cipherParams = OpenSSLFormatter.parse(openSSLStr);

    expect(cipherParams.ciphertext!.toString()).toBe(data.ciphertext.toString());
    expect(cipherParams.salt!.toString()).toBe(data.salt.toString());
  });

  it('unSalted from string', () => {
    const openSSLStr = OpenSSLFormatter.stringify(CipherParams.create({ ciphertext: data.ciphertext }));
    const cipherParams = OpenSSLFormatter.parse(openSSLStr);

    expect(cipherParams.ciphertext!.toString()).toBe(data.ciphertext.toString());
  });
});
