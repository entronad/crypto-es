/* eslint-disable no-undef */
import { HMAC, Hex, HmacMD5, MD5Algo, WordArray } from '../src/index';

describe('hmac-md5', () => {
  it('vector 1', () => {
    expect(HmacMD5('Hi There', Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
      .toBe('9294727a3638bb1c13f48ef8158bfc9d');
  });

  it('vector 2', () => {
    expect(HmacMD5('what do ya want for nothing?', 'Jefe').toString())
      .toBe('750c783e6ab0b503eaa86e310a5db738');
  });

  it('vector 3', () => {
    expect(HmacMD5(Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString())
      .toBe('56be34521d144c88dbb8c733f0e8b3f6');
  });

  it('vector 4', () => {
    expect(HmacMD5('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString())
      .toBe('7ee2a3cc979ab19865704644ce13355c');
  });

  it('vector 5', () => {
    expect(HmacMD5('abcdefghijklmnopqrstuvwxyz', 'A').toString())
      .toBe('0e1bd89c43e3e6e3b3f8cf1d5ba4f77a');
  });

  it('update', () => {
    const hmac = HMAC.create(MD5Algo, Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));

    expect(hmac.finalize().toString())
      .toBe(HmacMD5(Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
  });

  it('input integrity', () => {
    const message = WordArray.create([0x12345678]);
    const key = WordArray.create([0x12345678]);

    const expectedMessage = message.toString();
    const expectedKey = key.toString();

    HmacMD5(message, key);

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
  });

  it('respect key sigBytes', () => {
    const key = WordArray.random(8);
    key.sigBytes = 4;

    const keyClamped = key.clone();
    keyClamped.clamp();

    expect(HmacMD5('Message', key).toString())
      .toBe(HmacMD5('Message', keyClamped).toString());
  });
});
