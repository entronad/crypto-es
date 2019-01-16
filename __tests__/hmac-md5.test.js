/* eslint-disable no-undef */
import C from '../src/index.js';

describe('hmac-md5', () => {
  it('vector 1', () => {
    expect(C.HmacMD5('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
      .toBe('9294727a3638bb1c13f48ef8158bfc9d');
  });

  it('vector 2', () => {
    expect(C.HmacMD5('what do ya want for nothing?', 'Jefe').toString())
      .toBe('750c783e6ab0b503eaa86e310a5db738');
  });

  it('vector 3', () => {
    expect(C.HmacMD5(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString())
      .toBe('56be34521d144c88dbb8c733f0e8b3f6');
  });

  it('vector 4', () => {
    expect(C.HmacMD5('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString())
      .toBe('7ee2a3cc979ab19865704644ce13355c');
  });

  it('vector 5', () => {
    expect(C.HmacMD5('abcdefghijklmnopqrstuvwxyz', 'A').toString())
      .toBe('0e1bd89c43e3e6e3b3f8cf1d5ba4f77a');
  });

  it('update', () => {
    const hmac = C.algo.HMAC.create(C.algo.MD5, C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));

    expect(hmac.finalize().toString())
      .toBe(C.HmacMD5(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
  });

  it('input integrity', () => {
    const message = C.lib.WordArray.create([0x12345678]);
    const key = C.lib.WordArray.create([0x12345678]);

    const expectedMessage = message.toString();
    const expectedKey = key.toString();

    C.HmacMD5(message, key);

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
  });

  it('respect key sigBytes', () => {
    const key = C.lib.WordArray.random(8);
    key.sigBytes = 4;

    const keyClamped = key.clone();
    keyClamped.clamp();

    expect(C.HmacMD5('Message', key).toString())
      .toBe(C.HmacMD5('Message', keyClamped).toString());
  });
});
