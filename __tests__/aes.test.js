/* eslint-disable no-undef */
import C from '../src/index.js';

describe('aes', () => {
  it('encrypt keySize 128', () => {
    expect(C.AES.encrypt(C.enc.Hex.parse('00112233445566778899aabbccddeeff'), C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('69c4e0d86a7b0430d8cdb78070b4c55a');
  });

  it('encrypt keySize 192', () => {
    expect(C.AES.encrypt(C.enc.Hex.parse('00112233445566778899aabbccddeeff'), C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('dda97ca4864cdfe06eaf70a0ec0d7191');
  });

  it('encrypt keySize 256', () => {
    expect(C.AES.encrypt(C.enc.Hex.parse('00112233445566778899aabbccddeeff'), C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe('8ea2b7ca516745bfeafc49904b496089');
  });

  it('decrypt keySize 128', () => {
    expect(C.AES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('69c4e0d86a7b0430d8cdb78070b4c55a') }), C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('00112233445566778899aabbccddeeff');
  });

  it('decrypt keySize 192', () => {
    expect(C.AES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('dda97ca4864cdfe06eaf70a0ec0d7191') }), C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('00112233445566778899aabbccddeeff');
  });

  it('decrypt keySize 256', () => {
    expect(C.AES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse('8ea2b7ca516745bfeafc49904b496089') }), C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe('00112233445566778899aabbccddeeff');
  });

  it('multi part', () => {
    const aes = C.algo.AES.createEncryptor(C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'), { mode: C.mode.ECB, padding: C.pad.NoPadding });
    const ciphertext1 = aes.process(C.enc.Hex.parse('001122334455'));
    const ciphertext2 = aes.process(C.enc.Hex.parse('66778899aa'));
    const ciphertext3 = aes.process(C.enc.Hex.parse('bbccddeeff'));
    const ciphertext4 = aes.finalize();

    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
      .toBe('69c4e0d86a7b0430d8cdb78070b4c55a');
  });

  it('input integrity', () => {
    const message = C.enc.Hex.parse('00112233445566778899aabbccddeeff');
    const key = C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
    const iv = C.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');

    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    const expectedIv = iv.toString();

    C.AES.encrypt(message, key, { iv });

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

    expect(C.AES.encrypt('Hi There', C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString())
      .toBe(C.algo.AES.createEncryptor(C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).finalize('Hi There').toString());
    expect(C.AES.encrypt('Hi There', C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe(C.lib.SerializableCipher.encrypt(C.algo.AES, 'Hi There', C.SHA256('Jefe'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString());
    expect(C.AES.encrypt('Hi There', 'Jefe', { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString())
      .toBe(C.lib.PasswordBasedCipher.encrypt(C.algo.AES, 'Hi There', 'Jefe', { mode: C.mode.ECB, padding: C.pad.NoPadding }).toString());

    // Restore random method
    C.lib.WordArray.random = random;
  });
});
