/* eslint-disable no-undef */
import { ECB, Hex, NoPadding, PasswordBasedCipher, RC4, RC4Algo, RC4Drop, SHA256, SerializableCipher, WordArray } from '../src/index';

describe('rc4', () => {
  it('vector 1', () => {
    expect(RC4.encrypt(Hex.parse('0000000000000000'), Hex.parse('0123456789abcdef')).ciphertext!.toString())
      .toBe('7494c2e7104b0879');
  });

  it('vector 2', () => {
    expect(RC4.encrypt(Hex.parse('dcee4cf92c'), Hex.parse('618a63d2fb')).ciphertext!.toString())
      .toBe('f13829c9de');
  });

  it('drop', () => {
    expect(RC4Drop.encrypt(Hex.parse('0000000000000000'), Hex.parse('0123456789abcdef'), { drop: 2 }).ciphertext!.toString())
      .toBe(RC4.encrypt(Hex.parse('00000000000000000000000000000000'), Hex.parse('0123456789abcdef')).ciphertext!.toString().substr(16));
  });

  it('multi part', () => {
    const rabbit = RC4Algo.createEncryptor(Hex.parse('0123456789abcdef'));
    const ciphertext1 = rabbit.process(Hex.parse('00000000'));
    const ciphertext2 = rabbit.process(Hex.parse('0000'));
    const ciphertext3 = rabbit.process(Hex.parse('0000'));
    const ciphertext4 = rabbit.finalize();

    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
      .toBe('7494c2e7104b0879');
  });

  it('input integrity', () => {
    const message = Hex.parse('0000000000000000');
    const key = Hex.parse('0123456789abcdef');

    const expectedMessage = message.toString();
    const expectedKey = key.toString();

    RC4.encrypt(message, key);

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
  });

  it('test helper', () => {
    // Save original random method
    const { random } = WordArray;

    // Replace random method with one that returns a predictable value
    WordArray.random = (nBytes) => {
      const words: number[] = [];
      for (let i = 0; i < nBytes; i += 4) {
        words.push(0x11223344);
      }

      return WordArray.create(words, nBytes);
    };

    expect(RC4.encrypt('Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe(RC4Algo.createEncryptor(SHA256('Jefe'), { mode: ECB, padding: NoPadding }).finalize('Hi There').toString());
    expect(RC4.encrypt('Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).toString())
      .toBe(SerializableCipher.encrypt(RC4Algo, 'Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).toString());
    expect(RC4.encrypt('Hi There', 'Jefe', { mode: ECB, padding: NoPadding }).toString())
      .toBe(PasswordBasedCipher.encrypt(RC4Algo, 'Hi There', 'Jefe', { mode: ECB, padding: NoPadding }).toString());

    // Restore random method
    WordArray.random = random;
  });
});
