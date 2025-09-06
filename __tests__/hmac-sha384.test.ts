/* eslint-disable no-undef */
import { HMAC, Hex, HmacSHA3, HmacSHA384, SHA384Algo, SHA3Algo, WordArray } from '../src/index';

describe('hmac-sha384', () => {
  it('vector 1', () => {
    expect(HmacSHA384('Hi There', Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
      .toBe('7afaa633e20d379b02395915fbc385ff8dc27dcd3885e1068ab942eeab52ec1f20ad382a92370d8b2e0ac8b83c4d53bf');
  });

  it('vector 2', () => {
    expect(HmacSHA384('what do ya want for nothing?', 'Jefe').toString())
      .toBe('af45d2e376484031617f78d2b58a6b1b9c7ef464f5a01b47e42ec3736322445e8e2240ca5e69e2c78b3239ecfab21649');
  });

  it('vector 3', () => {
    expect(HmacSHA384(Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString())
      .toBe('1383e82e28286b91f4cc7afbd13d5b5c6f887c05e7c4542484043a37a5fe45802a9470fb663bd7b6570fe2f503fc92f5');
  });

  it('vector 4', () => {
    expect(HmacSHA384('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString())
      .toBe('365dfb271adb8e30fe6c74220b75df1b38c2d19b9d37f2e5a0ec2f3f22bd0406bf5b786e98d81b82c36d3d8a1be6cd07');
  });

  it('vector 5', () => {
    expect(HmacSHA384('abcdefghijklmnopqrstuvwxyz', 'A').toString())
      .toBe('a8357d5e84da64140e41545562ae0782e2a58e39c6cd98939fad8d9080e774c84b7eaca4ba07f6dbf0f12eab912c5285');
  });

  it('update', () => {
    const hmac = HMAC.create(SHA384Algo, Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));

    expect(hmac.finalize().toString())
      .toBe(HmacSHA384(Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
  });

  it('input integrity', () => {
    const message = WordArray.create([0x12345678]);
    const key = WordArray.create([0x12345678]);

    const expectedMessage = message.toString();
    const expectedKey = key.toString();

    HmacSHA384(message, key);

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
  });

  it('respect key sigBytes', () => {
    const key = WordArray.random(8);
    key.sigBytes = 4;

    const keyClamped = key.clone();
    keyClamped.clamp();

    expect(HmacSHA384('Message', key).toString())
      .toBe(HmacSHA384('Message', keyClamped).toString());
  });
});
