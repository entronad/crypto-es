/* eslint-disable no-undef */
import { CipherParams, DES, DESAlgo, ECB, Hex, NoPadding, PasswordBasedCipher, SHA256, SerializableCipher, WordArray } from '../src/index';

describe('des', () => {
  it('encrypt 1', () => {
    expect(DES.encrypt(Hex.parse('0000000000000000'), Hex.parse('8000000000000000'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('95a8d72813daa94d');
  });

  it('encrypt 2', () => {
    expect(DES.encrypt(Hex.parse('0000000000000000'), Hex.parse('0000000000002000'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('1de5279dae3bed6f');
  });

  it('encrypt 3', () => {
    expect(DES.encrypt(Hex.parse('0000000000002000'), Hex.parse('0000000000000000'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('1d1ca853ae7c0c5f');
  });

  it('encrypt 4', () => {
    expect(DES.encrypt(Hex.parse('3232323232323232'), Hex.parse('3232323232323232'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('ac978c247863388f');
  });

  it('encrypt 5', () => {
    expect(DES.encrypt(Hex.parse('6464646464646464'), Hex.parse('6464646464646464'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('3af1703d76442789');
  });

  it('encrypt 6', () => {
    expect(DES.encrypt(Hex.parse('9696969696969696'), Hex.parse('9696969696969696'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('a020003c5554f34c');
  });

  it('decrypt 1', () => {
    expect(DES.decrypt(CipherParams.create({ ciphertext: Hex.parse('95a8d72813daa94d') }), Hex.parse('8000000000000000'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('0000000000000000');
  });

  it('decrypt 2', () => {
    expect(DES.decrypt(CipherParams.create({ ciphertext: Hex.parse('1de5279dae3bed6f') }), Hex.parse('0000000000002000'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('0000000000000000');
  });

  it('decrypt 3', () => {
    expect(DES.decrypt(CipherParams.create({ ciphertext: Hex.parse('1d1ca853ae7c0c5f') }), Hex.parse('0000000000000000'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('0000000000002000');
  });

  it('decrypt 4', () => {
    expect(DES.decrypt(CipherParams.create({ ciphertext: Hex.parse('ac978c247863388f') }), Hex.parse('3232323232323232'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('3232323232323232');
  });

  it('decrypt 5', () => {
    expect(DES.decrypt(CipherParams.create({ ciphertext: Hex.parse('3af1703d76442789') }), Hex.parse('6464646464646464'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('6464646464646464');
  });

  it('decrypt 6', () => {
    expect(DES.decrypt(CipherParams.create({ ciphertext: Hex.parse('a020003c5554f34c') }), Hex.parse('9696969696969696'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('9696969696969696');
  });

  it('multi part', () => {
    const des = DESAlgo.createEncryptor(Hex.parse('0123456789abcdef'), { mode: ECB, padding: NoPadding });
    const ciphertext1 = des.process(Hex.parse('001122334455'));
    const ciphertext2 = des.process(Hex.parse('66778899aa'));
    const ciphertext3 = des.process(Hex.parse('bbccddeeff'));
    const ciphertext4 = des.finalize();

    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
      .toBe(DES.encrypt(Hex.parse('00112233445566778899aabbccddeeff'), Hex.parse('0123456789abcdef'), { mode: ECB, padding: NoPadding }).ciphertext!.toString());
  });

  it('input integrity', () => {
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('0001020304050607');
    const iv = Hex.parse('08090a0b0c0d0e0f');

    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    const expectedIv = iv.toString();

    DES.encrypt(message, key, { iv });

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

    expect(DES.encrypt('Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe(DESAlgo.createEncryptor(SHA256('Jefe'), { mode: ECB, padding: NoPadding }).finalize('Hi There').toString());
    expect(DES.encrypt('Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).toString())
      .toBe(SerializableCipher.encrypt(DESAlgo, 'Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).toString());
    expect(DES.encrypt('Hi There', 'Jefe', { mode: ECB, padding: NoPadding }).toString())
      .toBe(PasswordBasedCipher.encrypt(DESAlgo, 'Hi There', 'Jefe', { mode: ECB, padding: NoPadding }).toString());

    // Restore random method
    WordArray.random = random;
  });
});
