/* eslint-disable no-undef */
import { HMAC, Hex, HmacSHA256, SHA256Algo, WordArray } from '../src/index';

describe('hmac-sha256', () => {
  it('vector 1', () => {
    expect(HmacSHA256('Hi There', Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
      .toBe('492ce020fe2534a5789dc3848806c78f4f6711397f08e7e7a12ca5a4483c8aa6');
  });

  it('vector 2', () => {
    expect(HmacSHA256('what do ya want for nothing?', 'Jefe').toString())
      .toBe('5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843');
  });

  it('vector 3', () => {
    expect(HmacSHA256(Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString())
      .toBe('7dda3cc169743a6484649f94f0eda0f9f2ff496a9733fb796ed5adb40a44c3c1');
  });

  it('vector 4', () => {
    expect(HmacSHA256('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString())
      .toBe('a89dc8178c1184a62df87adaa77bf86e93064863d93c5131140b0ae98b866687');
  });

  it('vector 5', () => {
    expect(HmacSHA256('abcdefghijklmnopqrstuvwxyz', 'A').toString())
      .toBe('d8cb78419c02fe20b90f8b77427dd9f81817a751d74c2e484e0ac5fc4e6ca986');
  });

  it('update', () => {
    const hmac = HMAC.create(SHA256Algo, Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));

    expect(hmac.finalize().toString())
      .toBe(HmacSHA256(Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
  });

  it('input integrity', () => {
    const message = WordArray.create([0x12345678]);
    const key = WordArray.create([0x12345678]);

    const expectedMessage = message.toString();
    const expectedKey = key.toString();

    HmacSHA256(message, key);

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
  });

  it('respect key sigBytes', () => {
    const key = WordArray.random(8);
    key.sigBytes = 4;

    const keyClamped = key.clone();
    keyClamped.clamp();

    expect(HmacSHA256('Message', key).toString())
      .toBe(HmacSHA256('Message', keyClamped).toString());
  });
});
