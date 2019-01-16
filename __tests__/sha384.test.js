/* eslint-disable no-undef */
import C from '../src/index.js';

describe('sha384', () => {
  it('vector 1', () => {
    expect(C.SHA384('').toString())
      .toBe('38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b');
  });

  it('vector 2', () => {
    expect(C.SHA384('The quick brown fox jumps over the lazy dog').toString())
      .toBe('ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1');
  });

  it('vector 3', () => {
    expect(C.SHA384('The quick brown fox jumps over the lazy dog.').toString())
      .toBe('ed892481d8272ca6df370bf706e4d7bc1b5739fa2177aae6c50e946678718fc67a7af2819a021c2fc34e91bdb63409d7');
  });

  it('update and long message', () => {
    const sha384 = C.algo.SHA384.create();
    for (let i = 0; i < 100; i += 1) {
      sha384.update('12345678901234567890123456789012345678901234567890');
    }

    expect(sha384.finalize().toString())
      .toBe('297a519246d6f639a4020119e1f03fc8d77171647b2ff75ea4125b7150fed0cdcc93f8dca1c3c6a624d5e88d780d82cd');
  });

  it('clone', () => {
    const sha384 = C.algo.SHA384.create();

    expect(sha384.update('a').clone().finalize().toString()).toBe(C.SHA384('a').toString());
    expect(sha384.update('b').clone().finalize().toString()).toBe(C.SHA384('ab').toString());
    expect(sha384.update('c').clone().finalize().toString()).toBe(C.SHA384('abc').toString());
  });

  it('input integrity', () => {
    const message = C.lib.WordArray.create([0x12345678]);

    const expected = message.toString();

    C.SHA384(message);

    expect(message.toString()).toBe(expected);
  });

  it('helper', () => {
    expect(C.SHA384('').toString()).toBe(C.algo.SHA384.create().finalize('').toString());
  });

  it('hmacHelper', () => {
    expect(C.HmacSHA384('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
      .toBe(C.algo.HMAC.create(C.algo.SHA384, C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).finalize('Hi There').toString());
  });
});
