/* eslint-disable no-undef */
import C from '../src/index.js';

describe('lib-passwordbasedcipher', () => {
  it('encrypt', () => {
    // Compute actual
    const actual = C.lib.PasswordBasedCipher.encrypt(C.algo.AES, 'Hello, World!', 'password');

    // Compute expected
    const aes = C.algo.AES.createEncryptor(actual.key, { iv: actual.iv });
    const expected = aes.finalize('Hello, World!');

    expect(actual.ciphertext.toString()).toBe(expected.toString());
  });

  it('decrypt', () => {
    const ciphertext = C.lib.PasswordBasedCipher.encrypt(C.algo.AES, 'Hello, World!', 'password');
    const plaintext = C.lib.PasswordBasedCipher.decrypt(C.algo.AES, ciphertext, 'password');

    expect(plaintext.toString(C.enc.Utf8)).toBe('Hello, World!');
  });
});
