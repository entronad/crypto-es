/* eslint-disable no-undef */
import C from '../src/index.js';

describe('des', () => {
  it('encrypt 1', () => {
    expect(C.DES.encrypt(C.enc.Hex.parse('0000000000000000'), C.enc.Hex.parse('8000000000000000'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('95a8d72813daa94d');
  });

  it('encrypt 2', () => {
    expect(C.DES.encrypt(C.enc.Hex.parse('0000000000000000'), C.enc.Hex.parse('0000000000002000'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('1de5279dae3bed6f');
  });

  it('encrypt 3', () => {
    expect(C.DES.encrypt(C.enc.Hex.parse('0000000000002000'), C.enc.Hex.parse('0000000000000000'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('1d1ca853ae7c0c5f');
  });

  it('encrypt 4', () => {
    expect(C.DES.encrypt(C.enc.Hex.parse('3232323232323232'), C.enc.Hex.parse('3232323232323232'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('ac978c247863388f');
  });

  it('encrypt 5', () => {
    expect(C.DES.encrypt(C.enc.Hex.parse('6464646464646464'), C.enc.Hex.parse('6464646464646464'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('3af1703d76442789');
  });

  it('encrypt 6', () => {
    expect(C.DES.encrypt(C.enc.Hex.parse('9696969696969696'), C.enc.Hex.parse('9696969696969696'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('a020003c5554f34c');
  });

  it('decrypt 1', () => {
    expect(C.DES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('95a8d72813daa94d') }), C.enc.Hex.parse('8000000000000000'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('0000000000000000');
  });

  it('decrypt 2', () => {
    expect(C.DES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('1de5279dae3bed6f') }), C.enc.Hex.parse('0000000000002000'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('0000000000000000');
  });

  it('decrypt 3', () => {
    expect(C.DES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('1d1ca853ae7c0c5f') }), C.enc.Hex.parse('0000000000000000'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('0000000000002000');
  });

  it('decrypt 4', () => {
    expect(C.DES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('ac978c247863388f') }), C.enc.Hex.parse('3232323232323232'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('3232323232323232');
  });

  it('decrypt 5', () => {
    expect(C.DES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('3af1703d76442789') }), C.enc.Hex.parse('6464646464646464'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('6464646464646464');
  });

  it('decrypt 6', () => {
    expect(C.DES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('a020003c5554f34c') }), C.enc.Hex.parse('9696969696969696'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('9696969696969696');
  });

  it('multi part', () => {
    const des = C.algo.DES.createEncryptor(C.enc.Hex.parse('0123456789abcdef'), { mode: C.mode.ECB, padding: C.pad.NoPadding });
    const ciphertext1 = des.process(C.enc.Hex.parse('001122334455'));
    const ciphertext2 = des.process(C.enc.Hex.parse('66778899aa'));
    const ciphertext3 = des.process(C.enc.Hex.parse('bbccddeeff'));
    const ciphertext4 = des.finalize();

    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
      .toBe(C.DES.encrypt(C.enc.Hex.parse('00112233445566778899aabbccddeeff'), C.enc.Hex.parse('0123456789abcdef'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString());
  });

  it('input integrity', () => {
    const message = C.enc.Hex.parse('00112233445566778899aabbccddeeff');
    const key = C.enc.Hex.parse('0001020304050607');
    const iv = C.enc.Hex.parse('08090a0b0c0d0e0f');

    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    const expectedIv = iv.toString();

    C.DES.encrypt(message, key, { iv });

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
    expect(iv.toString()).toBe(expectedIv);
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

    expect(C.DES.encrypt('Hi There', C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe(C.algo.DES.createEncryptor(C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).finalize('Hi There').toString());
    expect(C.DES.encrypt('Hi There', C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe(C.lib.SerializableCipher.encrypt(C.algo.DES, 'Hi There', C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString());
    expect(C.DES.encrypt('Hi There', 'Jefe', { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe(C.lib.PasswordBasedCipher.encrypt(C.algo.DES, 'Hi There', 'Jefe', { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString());

    // Restore random method
    C.lib.WordArray.random = random;
  });
});
