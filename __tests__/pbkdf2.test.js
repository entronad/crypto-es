/* eslint-disable no-undef */
import C from '../lib/index.js';

describe('pbkdf2', () => {
  it('keySize 128', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128 / 32 }).toString())
      .toBe('62929ab995a1111c75c37bc562261ea3');
  });

  it('keySize 256', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 256 / 32 }).toString())
      .toBe('62929ab995a1111c75c37bc562261ea3fb3cdc7e725c4ca87c03cec5bb7663e1');
  });

  it('keySize 128 iterations 2', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128 / 32, iterations: 2 }).toString())
      .toBe('262fb72ea65b44ab5ceba7f8c8bfa781');
  });

  it('keySize 256 iterations 2', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 256 / 32, iterations: 2 }).toString())
      .toBe('262fb72ea65b44ab5ceba7f8c8bfa7815ff9939204eb7357a59a75877d745777');
  });

  it('keySize 128 iterations 1200', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128 / 32, iterations: 1200 }).toString())
      .toBe('c76a982415f1acc71dc197273c5b6ada');
  });

  it('keySize 256 iterations 1200', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 256 / 32, iterations: 1200 }).toString())
      .toBe('c76a982415f1acc71dc197273c5b6ada32f62915ed461718aad32843762433fa');
  });

  it('keySize 128 iterations 5', () => {
    expect(C.PBKDF2('password', C.enc.Hex.parse('1234567878563412'), { keySize: 128 / 32, iterations: 5 }).toString())
      .toBe('74e98b2e9eeddaab3113c1efc6d82b07');
  });

  it('keySize 256 iterations 5', () => {
    expect(C.PBKDF2('password', C.enc.Hex.parse('1234567878563412'), { keySize: 256 / 32, iterations: 5 }).toString())
      .toBe('74e98b2e9eeddaab3113c1efc6d82b073c4860195b3e0737fa21a4778f376321');
  });

  it('keySize 128 iterations 1200 pass phrase equals block size', () => {
    expect(C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase equals block size', { keySize: 128 / 32, iterations: 1200 }).toString())
      .toBe('c1dfb29a4d2f2fb67c6f78d074d66367');
  });

  it('keySize 256 iterations 1200 pass phrase equals block size', () => {
    expect(C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase equals block size', { keySize: 256 / 32, iterations: 1200 }).toString())
      .toBe('c1dfb29a4d2f2fb67c6f78d074d663671e6fd4da1e598572b1fecf256cb7cf61');
  });

  it('keySize 128 iterations 1200 pass phrase exceeds block size', () => {
    expect(C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase exceeds block size', { keySize: 128 / 32, iterations: 1200 }).toString())
      .toBe('22344bc4b6e32675a8090f3ea80be01d');
  });

  it('keySize 256 iterations 1200 pass phrase exceeds block size', () => {
    expect(C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase exceeds block size', { keySize: 256 / 32, iterations: 1200 }).toString())
      .toBe('22344bc4b6e32675a8090f3ea80be01d5f95126a2cddc3facc4a5e6dca04ec58');
  });

  it('keySize 128 iterations 50', () => {
    expect(C.PBKDF2(C.enc.Hex.parse('f09d849e'), 'EXAMPLE.COMpianist', { keySize: 128 / 32, iterations: 50 }).toString())
      .toBe('44b0781253db3141ac4174af29325818');
  });

  it('keySize 256 iterations 50', () => {
    expect(C.PBKDF2(C.enc.Hex.parse('f09d849e'), 'EXAMPLE.COMpianist', { keySize: 256 / 32, iterations: 50 }).toString())
      .toBe('44b0781253db3141ac4174af29325818584698d507a79f9879033dec308a2b77');
  });

  it('input integrity', () => {
    const password = C.lib.WordArray.create([0x12345678]);
    const salt = C.lib.WordArray.create([0x12345678]);

    const expectedPassword = password.toString();
    const expectedSalt = salt.toString();

    C.PBKDF2(password, salt);

    expect(password.toString()).toBe(expectedPassword);
    expect(salt.toString()).toBe(expectedSalt);
  });

  it('helper', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128 / 32 }).toString())
      .toBe(C.algo.PBKDF2.create({ keySize: 128 / 32 }).compute('password', 'ATHENA.MIT.EDUraeburn').toString());
  });
});
