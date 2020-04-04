/* eslint-disable no-undef */
import C from '../lib/index.js';

describe('triple des', () => {
  it('encrypt 1', () => {
    expect(C.TripleDES.encrypt(C.enc.Hex.parse('0000000000000000'), C.enc.Hex.parse('800101010101010180010101010101018001010101010101'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('95a8d72813daa94d');
  });

  it('encrypt 2', () => {
    expect(C.TripleDES.encrypt(C.enc.Hex.parse('0000000000000000'), C.enc.Hex.parse('010101010101010201010101010101020101010101010102'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('869efd7f9f265a09');
  });

  it('encrypt 3', () => {
    expect(C.TripleDES.encrypt(C.enc.Hex.parse('8000000000000000'), C.enc.Hex.parse('010101010101010101010101010101010101010101010101'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('95f8a5e5dd31d900');
  });

  it('encrypt 4', () => {
    expect(C.TripleDES.encrypt(C.enc.Hex.parse('0000000000000001'), C.enc.Hex.parse('010101010101010101010101010101010101010101010101'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('166b40b44aba4bd6');
  });

  it('decrypt 1', () => {
    expect(C.TripleDES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('95a8d72813daa94d') }), C.enc.Hex.parse('800101010101010180010101010101018001010101010101'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('0000000000000000');
  });

  it('decrypt 2', () => {
    expect(C.TripleDES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('869efd7f9f265a09') }), C.enc.Hex.parse('010101010101010201010101010101020101010101010102'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('0000000000000000');
  });

  it('decrypt 3', () => {
    expect(C.TripleDES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('95f8a5e5dd31d900') }), C.enc.Hex.parse('010101010101010101010101010101010101010101010101'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('8000000000000000');
  });

  it('decrypt 4', () => {
    expect(C.TripleDES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('166b40b44aba4bd6') }), C.enc.Hex.parse('010101010101010101010101010101010101010101010101'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('0000000000000001');
  });

  it('multi part', () => {
    const des = C.algo.TripleDES.createEncryptor(C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), { mode: C.mode.ECB, padding: C.pad.NoPadding });
    const ciphertext1 = des.process(C.enc.Hex.parse('001122334455'));
    const ciphertext2 = des.process(C.enc.Hex.parse('66778899aa'));
    const ciphertext3 = des.process(C.enc.Hex.parse('bbccddeeff'));
    const ciphertext4 = des.finalize();

    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
      .toBe(C.TripleDES.encrypt(C.enc.Hex.parse('00112233445566778899aabbccddeeff'), C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString());
  });

  it('input integrity', () => {
    const message = C.enc.Hex.parse('00112233445566778899aabbccddeeff');
    const key = C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617');
    const iv = C.enc.Hex.parse('08090a0b0c0d0e0f');

    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    const expectedIv = iv.toString();

    C.TripleDES.encrypt(message, key, { iv });

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
    expect(iv.toString()).toBe(expectedIv);
  });

  it('test 64 bit key', () => {
    const message = C.enc.Hex.parse('00112233445566778899aabbccddeeff');
    const key = C.enc.Hex.parse('0011223344556677');
    const extendedKey = C.enc.Hex.parse('001122334455667700112233445566770011223344556677');

    const output1 = C.TripleDES.encrypt(message, key, { mode: C.mode.ECB }).toString();
    const output2 = C.TripleDES.encrypt(message, extendedKey, { mode: C.mode.ECB }).toString();

    expect(output1).toBe(output2);
  });

  it('test 128 bit key', () => {
    const message = C.enc.Hex.parse('00112233445566778899aabbccddeeff');
    const key = C.enc.Hex.parse('00112233445566778899aabbccddeeff');
    const extendedKey = C.enc.Hex.parse('00112233445566778899aabbccddeeff0011223344556677');

    const output1 = C.TripleDES.encrypt(message, key, { mode: C.mode.ECB }).toString();
    const output2 = C.TripleDES.encrypt(message, extendedKey, { mode: C.mode.ECB }).toString();

    expect(output1).toBe(output2);
  });

  it('test 256 bit key', () => {
    const message = C.enc.Hex.parse('00112233445566778899aabbccddeeff');
    const key = C.enc.Hex.parse('00112233445566778899aabbccddeeff0112233445566778899aabbccddeeff0');
    const truncatedKey = C.enc.Hex.parse('00112233445566778899aabbccddeeff0112233445566778');

    const output1 = C.TripleDES.encrypt(message, key, { mode: C.mode.ECB }).toString();
    const output2 = C.TripleDES.encrypt(message, truncatedKey, { mode: C.mode.ECB }).toString();

    expect(output1).toBe(output2);
  });

  it('test helper', () => {
    // Save original random method
    const { random } = C.lib.WordArray;

    // Replace random method with one that returns a predictable value
    C.lib.WordArray.random = (nBytes) => {
      const words = [];
      for (let i = 0; i < nBytes; i += 4) {
        words.push([0x11223344]);
      }

      return C.lib.WordArray.create(words, nBytes);
    };

    expect(C.TripleDES.encrypt('Hi There', C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe(C.algo.TripleDES.createEncryptor(C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).finalize('Hi There').toString());
    expect(C.TripleDES.encrypt('Hi There', C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe(C.lib.SerializableCipher.encrypt(C.algo.TripleDES, 'Hi There', C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString());
    expect(C.TripleDES.encrypt('Hi There', 'Jefe', { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe(C.lib.PasswordBasedCipher.encrypt(C.algo.TripleDES, 'Hi There', 'Jefe', { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString());

    // Restore random method
    C.lib.WordArray.random = random;
  });
});
