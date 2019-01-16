/* eslint-disable no-undef */
import C from '../src/index.js';

describe('sha1', () => {
  it('vector 1', () => {
    expect(C.SHA1('').toString()).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709');
  });

  it('vector 2', () => {
    expect(C.SHA1('a').toString()).toBe('86f7e437faa5a7fce15d1ddcb9eaeaea377667b8');
  });

  it('vector 3', () => {
    expect(C.SHA1('abc').toString()).toBe('a9993e364706816aba3e25717850c26c9cd0d89d');
  });

  it('vector 4', () => {
    expect(C.SHA1('message digest').toString()).toBe('c12252ceda8be8994d5fa0290a47231c1d16aae3');
  });

  it('vector 5', () => {
    expect(C.SHA1('abcdefghijklmnopqrstuvwxyz').toString())
      .toBe('32d10c7b8cf96570ca04ce37f2a19d84240d3a89');
  });

  it('vector 6', () => {
    expect(C.SHA1('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789').toString())
      .toBe('761c457bf73b14d27e9e9265c46f4b4dda11f940');
  });

  it('vector 7', () => {
    expect(C.SHA1('12345678901234567890123456789012345678901234567890123456789012345678901234567890').toString())
      .toBe('50abf5706a150990a08b2c5ea40fa0e585554732');
  });

  it('update and long message', () => {
    const sha1 = C.algo.SHA1.create();
    for (let i = 0; i < 100; i += 1) {
      sha1.update('12345678901234567890123456789012345678901234567890');
    }

    expect(sha1.finalize().toString()).toBe('85e4c4b3933d5553ebf82090409a9d90226d845c');
  });

  it('clone', () => {
    const sha1 = C.algo.SHA1.create();

    expect(sha1.update('a').clone().finalize().toString()).toBe(C.SHA1('a').toString());
    expect(sha1.update('b').clone().finalize().toString()).toBe(C.SHA1('ab').toString());
    expect(sha1.update('c').clone().finalize().toString()).toBe(C.SHA1('abc').toString());
  });

  it('input integrity', () => {
    const message = C.lib.WordArray.create([0x12345678]);

    const expected = message.toString();

    C.SHA1(message);

    expect(message.toString()).toBe(expected);
  });

  it('helper', () => {
    expect(C.SHA1('').toString()).toBe(C.algo.SHA1.create().finalize('').toString());
  });

  it('hmacHelper', () => {
    expect(C.HmacSHA1('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
      .toBe(C.algo.HMAC.create(C.algo.SHA1, C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).finalize('Hi There').toString());
  });
});
