/* eslint-disable no-undef */
/* eslint-disable max-len */
import C from '../src/index.js';

const data = {};

beforeAll(() => {
  data.ciphertext = C.lib.WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);
  data.salt = C.lib.WordArray.create([0x01234567, 0x89abcdef]);
});

describe('format-openssl', () => {
  it('salted to string', () => {
    expect(C.format.OpenSSL.stringify(C.lib.CipherParams.create({ ciphertext: data.ciphertext, salt: data.salt })))
      .toBe(C.enc.Latin1.parse('Salted__').concat(data.salt).concat(data.ciphertext).toString(C.enc.Base64));
  });

  it('unSalted to string', () => {
    expect(C.format.OpenSSL.stringify(C.lib.CipherParams.create({ ciphertext: data.ciphertext })))
      .toBe(data.ciphertext.toString(C.enc.Base64));
  });

  it('salted from string', () => {
    const openSSLStr = C.format.OpenSSL.stringify(C.lib.CipherParams.create({ ciphertext: data.ciphertext, salt: data.salt }));
    const cipherParams = C.format.OpenSSL.parse(openSSLStr);

    expect(cipherParams.ciphertext.toString()).toBe(data.ciphertext.toString());
    expect(cipherParams.salt.toString()).toBe(data.salt.toString());
  });

  it('unSalted from string', () => {
    const openSSLStr = C.format.OpenSSL.stringify(C.lib.CipherParams.create({ ciphertext: data.ciphertext }));
    const cipherParams = C.format.OpenSSL.parse(openSSLStr);

    expect(cipherParams.ciphertext.toString()).toBe(data.ciphertext.toString());
  });
});
