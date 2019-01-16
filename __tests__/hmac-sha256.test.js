/* eslint-disable no-undef */
import C from '../src/index.js';

describe('hmac-sha256', () => {
  it('vector 1', () => {
    expect(C.HmacSHA256('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
      .toBe('492ce020fe2534a5789dc3848806c78f4f6711397f08e7e7a12ca5a4483c8aa6');
  });

  it('vector 2', () => {
    expect(C.HmacSHA256('what do ya want for nothing?', 'Jefe').toString())
      .toBe('5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843');
  });

  it('vector 3', () => {
    expect(C.HmacSHA256(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString())
      .toBe('7dda3cc169743a6484649f94f0eda0f9f2ff496a9733fb796ed5adb40a44c3c1');
  });

  it('vector 4', () => {
    expect(C.HmacSHA256('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString())
      .toBe('a89dc8178c1184a62df87adaa77bf86e93064863d93c5131140b0ae98b866687');
  });

  it('vector 5', () => {
    expect(C.HmacSHA256('abcdefghijklmnopqrstuvwxyz', 'A').toString())
      .toBe('d8cb78419c02fe20b90f8b77427dd9f81817a751d74c2e484e0ac5fc4e6ca986');
  });

  it('update', () => {
    const hmac = C.algo.HMAC.create(C.algo.SHA256, C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));

    expect(hmac.finalize().toString())
      .toBe(C.HmacSHA256(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
  });

  it('input integrity', () => {
    const message = C.lib.WordArray.create([0x12345678]);
    const key = C.lib.WordArray.create([0x12345678]);

    const expectedMessage = message.toString();
    const expectedKey = key.toString();

    C.HmacSHA256(message, key);

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
  });

  it('respect key sigBytes', () => {
    const key = C.lib.WordArray.random(8);
    key.sigBytes = 4;

    const keyClamped = key.clone();
    keyClamped.clamp();

    expect(C.HmacSHA256('Message', key).toString())
      .toBe(C.HmacSHA256('Message', keyClamped).toString());
  });
});
