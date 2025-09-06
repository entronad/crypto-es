/* eslint-disable no-undef */
import { AESAlgo, PasswordBasedCipher, Utf8 } from '../src/index';

describe('lib-passwordbasedcipher', () => {
  it('encrypt', () => {
    // Compute actual
    const actual = PasswordBasedCipher.encrypt(AESAlgo, 'Hello, World!', 'password');

    // Compute expected
    const aes = AESAlgo.createEncryptor(actual.key!, { iv: actual.iv });
    const expected = aes.finalize('Hello, World!');

    expect(actual.ciphertext!.toString()).toBe(expected.toString());
  });

  it('decrypt', () => {
    const ciphertext = PasswordBasedCipher.encrypt(AESAlgo, 'Hello, World!', 'password');
    const plaintext = PasswordBasedCipher.decrypt(AESAlgo, ciphertext, 'password');

    expect(plaintext.toString(Utf8)).toBe('Hello, World!');
  });
});
