/* eslint-disable no-undef */
import { AES, AESAlgo, CipherParams, ECB, Hex, NoPadding, PasswordBasedCipher, SHA256, SerializableCipher, WordArray } from '../src/index';

describe('aes', () => {
  it('encrypt keySize 128', () => {
    expect(AES.encrypt(Hex.parse('00112233445566778899aabbccddeeff'), Hex.parse('000102030405060708090a0b0c0d0e0f'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('69c4e0d86a7b0430d8cdb78070b4c55a');
  });

  it('encrypt keySize 192', () => {
    expect(AES.encrypt(Hex.parse('00112233445566778899aabbccddeeff'), Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('dda97ca4864cdfe06eaf70a0ec0d7191');
  });

  it('encrypt keySize 256', () => {
    expect(AES.encrypt(Hex.parse('00112233445566778899aabbccddeeff'), Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('8ea2b7ca516745bfeafc49904b496089');
  });

  it('decrypt keySize 128', () => {
    expect(AES.decrypt(CipherParams.create({ ciphertext: Hex.parse('69c4e0d86a7b0430d8cdb78070b4c55a') }), Hex.parse('000102030405060708090a0b0c0d0e0f'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('00112233445566778899aabbccddeeff');
  });

  it('decrypt keySize 192', () => {
    expect(AES.decrypt(CipherParams.create({ ciphertext: Hex.parse('dda97ca4864cdfe06eaf70a0ec0d7191') }), Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('00112233445566778899aabbccddeeff');
  });

  it('decrypt keySize 256', () => {
    expect(AES.decrypt(CipherParams.create({ ciphertext: Hex.parse('8ea2b7ca516745bfeafc49904b496089') }), Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('00112233445566778899aabbccddeeff');
  });

  it('multi part', () => {
    const aes = AESAlgo.createEncryptor(Hex.parse('000102030405060708090a0b0c0d0e0f'), { mode: ECB, padding: NoPadding });
    const ciphertext1 = aes.process(Hex.parse('001122334455'));
    const ciphertext2 = aes.process(Hex.parse('66778899aa'));
    const ciphertext3 = aes.process(Hex.parse('bbccddeeff'));
    const ciphertext4 = aes.finalize();

    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
      .toBe('69c4e0d86a7b0430d8cdb78070b4c55a');
  });

  it('input integrity', () => {
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('000102030405060708090a0b0c0d0e0f');
    const iv = Hex.parse('101112131415161718191a1b1c1d1e1f');

    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    const expectedIv = iv.toString();

    AES.encrypt(message, key, { iv });

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
    expect(iv.toString()).toBe(expectedIv);
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

    expect(AES.encrypt('Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe(AESAlgo.createEncryptor(SHA256('Jefe'), { mode: ECB, padding: NoPadding }).finalize('Hi There').toString());
    expect(AES.encrypt('Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).toString())
      .toBe(SerializableCipher.encrypt(AESAlgo, 'Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).toString());
    expect(AES.encrypt('Hi There', 'Jefe', { mode: ECB, padding: NoPadding }).toString())
      .toBe(PasswordBasedCipher.encrypt(AESAlgo, 'Hi There', 'Jefe', { mode: ECB, padding: NoPadding }).toString());

    // Restore random method
    WordArray.random = random;
  });
});
