/* eslint-disable no-undef */
import { AES, Hex, MD5Algo, SHA1Algo, SHA256Algo, SHA512Algo, Utf8 } from '../src/index';

const data: any = {};

beforeAll(() => {
  data.saltA = Hex.parse('AA00000000000000');
  data.saltB = Hex.parse('BB00000000000000');
});

describe('config', () => {
  it('encrypt', () => {
    expect(AES.encrypt('Test', 'Pass', {salt: data.saltA}).toString()).toBe(AES.encrypt('Test', 'Pass', {salt: data.saltA}).toString());
    expect(AES.encrypt('Test', 'Pass', {salt: data.saltA}).toString()).not.toBe(AES.encrypt('Test', 'Pass', {salt: data.saltB}).toString());
  });

  it('decrypt', () => {
    const encryptedA = AES.encrypt('Test', 'Pass', { salt: data.saltA});
    const encryptedB = AES.encrypt('Test', 'Pass', { salt: data.saltB});
    expect('Test').toBe(AES.decrypt(encryptedA, 'Pass').toString(Utf8));
    expect('Test').toBe(AES.decrypt(encryptedB, 'Pass').toString(Utf8));
  });

  it('custom KDF hasher', () => {
    // SHA1
    const encryptedSHA1 = AES.encrypt('Test', 'Pass', { salt: data.saltA, hasher: SHA1Algo}).toString();
    expect('Test').toBe(AES.decrypt(encryptedSHA1, 'Pass', {hasher: SHA1Algo}).toString(Utf8));

    // SHA256
    const encryptedSHA256 = AES.encrypt('Test', 'Pass', { salt: data.saltA, hasher: SHA256Algo}).toString();
    expect('Test').toBe(AES.decrypt(encryptedSHA256, 'Pass', {hasher: SHA256Algo}).toString(Utf8));

    // SHA512
    const encryptedSHA512 = AES.encrypt('Test', 'Pass', { salt: data.saltA, hasher: SHA512Algo}).toString();
    expect('Test').toBe(AES.decrypt(encryptedSHA512, 'Pass', {hasher: SHA512Algo}).toString(Utf8));

    // Default: MD5
    const encryptedDefault = AES.encrypt('Test', 'Pass', { salt: data.saltA}).toString();
    const encryptedMD5 = AES.encrypt('Test', 'Pass', { salt: data.saltA, hasher: MD5Algo}).toString();
    expect('Test').toBe(AES.decrypt(encryptedMD5, 'Pass', {hasher: MD5Algo}).toString(Utf8));
    expect(encryptedDefault).toBe(encryptedMD5);

    // Different KDFHasher
    expect(encryptedDefault).not.toBe(encryptedSHA1);
    expect(encryptedDefault).not.toBe(encryptedSHA256);
    expect(encryptedDefault).not.toBe(encryptedSHA512);
  });
});
