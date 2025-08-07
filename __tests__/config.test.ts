/* eslint-disable no-undef */
import C from '../src/index';

const data: any = {};

beforeAll(() => {
  data.saltA = C.enc.Hex.parse('AA00000000000000');
  data.saltB = C.enc.Hex.parse('BB00000000000000');
});

describe('config', () => {
  it('encrypt', () => {
    expect(C.AES.encrypt('Test', 'Pass', {salt: data.saltA}).toString()).toBe(C.AES.encrypt('Test', 'Pass', {salt: data.saltA}).toString());
    expect(C.AES.encrypt('Test', 'Pass', {salt: data.saltA}).toString()).not.toBe(C.AES.encrypt('Test', 'Pass', {salt: data.saltB}).toString());
  });

  it('decrypt', () => {
    const encryptedA = C.AES.encrypt('Test', 'Pass', { salt: data.saltA});
    const encryptedB = C.AES.encrypt('Test', 'Pass', { salt: data.saltB});
    expect('Test').toBe(C.AES.decrypt(encryptedA, 'Pass').toString(C.enc.Utf8));
    expect('Test').toBe(C.AES.decrypt(encryptedB, 'Pass').toString(C.enc.Utf8));
  });

  it('custom KDF hasher', () => {
    // SHA1
    const encryptedSHA1 = C.AES.encrypt('Test', 'Pass', { salt: data.saltA, hasher: C.algo.SHA1}).toString();
    expect('Test').toBe(C.AES.decrypt(encryptedSHA1, 'Pass', {hasher: C.algo.SHA1}).toString(C.enc.Utf8));

    // SHA256
    const encryptedSHA256 = C.AES.encrypt('Test', 'Pass', { salt: data.saltA, hasher: C.algo.SHA256}).toString();
    expect('Test').toBe(C.AES.decrypt(encryptedSHA256, 'Pass', {hasher: C.algo.SHA256}).toString(C.enc.Utf8));

    // SHA512
    const encryptedSHA512 = C.AES.encrypt('Test', 'Pass', { salt: data.saltA, hasher: C.algo.SHA512}).toString();
    expect('Test').toBe(C.AES.decrypt(encryptedSHA512, 'Pass', {hasher: C.algo.SHA512}).toString(C.enc.Utf8));

    // Default: MD5
    const encryptedDefault = C.AES.encrypt('Test', 'Pass', { salt: data.saltA}).toString();
    const encryptedMD5 = C.AES.encrypt('Test', 'Pass', { salt: data.saltA, hasher: C.algo.MD5}).toString();
    expect('Test').toBe(C.AES.decrypt(encryptedMD5, 'Pass', {hasher: C.algo.MD5}).toString(C.enc.Utf8));
    expect(encryptedDefault).toBe(encryptedMD5);

    // Different KDFHasher
    expect(encryptedDefault).not.toBe(encryptedSHA1);
    expect(encryptedDefault).not.toBe(encryptedSHA256);
    expect(encryptedDefault).not.toBe(encryptedSHA512);
  });
});
