/* eslint-disable no-undef */
import C from '../src';

describe('aes', () => {
  it.only('encrypt keySize 128', () => {
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
});
