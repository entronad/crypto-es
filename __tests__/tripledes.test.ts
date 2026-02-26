/* eslint-disable no-undef */
import { CipherParams, ECB, Hex, NoPadding, Pkcs7, PasswordBasedCipher, SHA256, SerializableCipher, TripleDES, TripleDESAlgo, Utf8, WordArray } from '../src/index';

describe('triple des', () => {
  it('encrypt 1', () => {
    expect(TripleDES.encrypt(Hex.parse('0000000000000000'), Hex.parse('800101010101010180010101010101018001010101010101'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('95a8d72813daa94d');
  });

  it('encrypt 2', () => {
    expect(TripleDES.encrypt(Hex.parse('0000000000000000'), Hex.parse('010101010101010201010101010101020101010101010102'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('869efd7f9f265a09');
  });

  it('encrypt 3', () => {
    expect(TripleDES.encrypt(Hex.parse('8000000000000000'), Hex.parse('010101010101010101010101010101010101010101010101'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('95f8a5e5dd31d900');
  });

  it('encrypt 4', () => {
    expect(TripleDES.encrypt(Hex.parse('0000000000000001'), Hex.parse('010101010101010101010101010101010101010101010101'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('166b40b44aba4bd6');
  });

  it('decrypt 1', () => {
    expect(TripleDES.decrypt(CipherParams.create({ ciphertext: Hex.parse('95a8d72813daa94d') }), Hex.parse('800101010101010180010101010101018001010101010101'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('0000000000000000');
  });

  it('decrypt 2', () => {
    expect(TripleDES.decrypt(CipherParams.create({ ciphertext: Hex.parse('869efd7f9f265a09') }), Hex.parse('010101010101010201010101010101020101010101010102'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('0000000000000000');
  });

  it('decrypt 3', () => {
    expect(TripleDES.decrypt(CipherParams.create({ ciphertext: Hex.parse('95f8a5e5dd31d900') }), Hex.parse('010101010101010101010101010101010101010101010101'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('8000000000000000');
  });

  it('decrypt 4', () => {
    expect(TripleDES.decrypt(CipherParams.create({ ciphertext: Hex.parse('166b40b44aba4bd6') }), Hex.parse('010101010101010101010101010101010101010101010101'), { mode: ECB, padding: NoPadding }).toString())
      .toBe('0000000000000001');
  });

  it('multi part', () => {
    const des = TripleDESAlgo.createEncryptor(Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), { mode: ECB, padding: NoPadding });
    const ciphertext1 = des.process(Hex.parse('001122334455'));
    const ciphertext2 = des.process(Hex.parse('66778899aa'));
    const ciphertext3 = des.process(Hex.parse('bbccddeeff'));
    const ciphertext4 = des.finalize();

    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
      .toBe(TripleDES.encrypt(Hex.parse('00112233445566778899aabbccddeeff'), Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), { mode: ECB, padding: NoPadding }).ciphertext!.toString());
  });

  it('input integrity', () => {
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617');
    const iv = Hex.parse('08090a0b0c0d0e0f');

    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    const expectedIv = iv.toString();

    TripleDES.encrypt(message, key, { iv });

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
    expect(iv.toString()).toBe(expectedIv);
  });

  it('test 64 bit key', () => {
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('0011223344556677');
    const extendedKey = Hex.parse('001122334455667700112233445566770011223344556677');

    const output1 = TripleDES.encrypt(message, key, { mode: ECB }).toString();
    const output2 = TripleDES.encrypt(message, extendedKey, { mode: ECB }).toString();

    expect(output1).toBe(output2);
  });

  it('test 128 bit key', () => {
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('00112233445566778899aabbccddeeff');
    const extendedKey = Hex.parse('00112233445566778899aabbccddeeff0011223344556677');

    const output1 = TripleDES.encrypt(message, key, { mode: ECB }).toString();
    const output2 = TripleDES.encrypt(message, extendedKey, { mode: ECB }).toString();

    expect(output1).toBe(output2);
  });

  it('test 256 bit key', () => {
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('00112233445566778899aabbccddeeff0112233445566778899aabbccddeeff0');
    const truncatedKey = Hex.parse('00112233445566778899aabbccddeeff0112233445566778');

    const output1 = TripleDES.encrypt(message, key, { mode: ECB }).toString();
    const output2 = TripleDES.encrypt(message, truncatedKey, { mode: ECB }).toString();

    expect(output1).toBe(output2);
  });

  it('multi block encrypt with no padding', () => {
    const key = Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617');
    const plaintext = Hex.parse('00112233445566778899aabbccddeeff0011223344556677');

    expect(TripleDES.encrypt(plaintext, key, { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe('97a25ba82b564f4c6142886a2ca8d53b97a25ba82b564f4c');
  });

  it('multi block decrypt with no padding', () => {
    const key = Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617');
    const ciphertext = Hex.parse('97a25ba82b564f4c6142886a2ca8d53b97a25ba82b564f4c');

    expect(TripleDES.decrypt(CipherParams.create({ ciphertext }), key, { mode: ECB, padding: NoPadding }).toString())
      .toBe('00112233445566778899aabbccddeeff0011223344556677');
  });

  it('multi block encrypt with pkcs7 padding', () => {
    const key = Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617');
    const plaintext = 'Hi There';

    expect(TripleDES.encrypt(plaintext, key, { mode: ECB, padding: Pkcs7 }).ciphertext!.toString())
      .toBe('74f8bcab6c1722eaa3cf6ec88bd97d73');
  });

  it('multi block decrypt with pkcs7 padding', () => {
    const key = Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617');
    const ciphertext = Hex.parse('74f8bcab6c1722eaa3cf6ec88bd97d73');

    expect(TripleDES.decrypt(CipherParams.create({ ciphertext }), key, { mode: ECB, padding: Pkcs7 }).toString(Utf8))
      .toBe('Hi There');
  });

  it('multi block round trip', () => {
    const key = Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617');
    const plaintext = 'The quick brown fox jumps over the lazy dog';

    const encrypted = TripleDES.encrypt(plaintext, key, { mode: ECB });
    const decrypted = TripleDES.decrypt(encrypted, key, { mode: ECB });

    expect(decrypted.toString(Utf8)).toBe(plaintext);
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

    expect(TripleDES.encrypt('Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe(TripleDESAlgo.createEncryptor(SHA256('Jefe'), { mode: ECB, padding: NoPadding }).finalize('Hi There').toString());
    expect(TripleDES.encrypt('Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).toString())
      .toBe(SerializableCipher.encrypt(TripleDESAlgo, 'Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).toString());
    expect(TripleDES.encrypt('Hi There', 'Jefe', { mode: ECB, padding: NoPadding }).toString())
      .toBe(PasswordBasedCipher.encrypt(TripleDESAlgo, 'Hi There', 'Jefe', { mode: ECB, padding: NoPadding }).toString());

    // Restore random method
    WordArray.random = random;
  });
});
