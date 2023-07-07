/* eslint-disable no-undef */
import C from '../lib/index.js';

describe('pbkdf2', () => {
  it('keySize 128', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128 / 32 }).toString())
      .toBe('cdedb5281bb2f801565a1122b2563515');
  });

  it('keySize 256', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 256 / 32 }).toString())
      .toBe('cdedb5281bb2f801565a1122b25635150ad1f7a04bb9f3a333ecc0e2e1f70837');
  });

  it('keySize 128 iterations 2', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128 / 32, iterations: 2 }).toString())
      .toBe('01dbee7f4a9e243e988b62c73cda935d');
  });

  it('keySize 256 iterations 2', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 256 / 32, iterations: 2 }).toString())
      .toBe('01dbee7f4a9e243e988b62c73cda935da05378b93244ec8f48a99e61ad799d86');
  });

  it('keySize 128 iterations 1200', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128 / 32, iterations: 1200 }).toString())
      .toBe('5c08eb61fdf71e4e4ec3cf6ba1f5512b');
  });

  it('keySize 256 iterations 1200', () => {
    expect(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 256 / 32, iterations: 1200 }).toString())
      .toBe('5c08eb61fdf71e4e4ec3cf6ba1f5512ba7e52ddbc5e5142f708a31e2e62b1e13');
  });

  it('keySize 128 iterations 5', () => {
    expect(C.PBKDF2('password', C.enc.Hex.parse('1234567878563412'), { keySize: 128 / 32, iterations: 5 }).toString())
      .toBe('d1daa78615f287e6a1c8b120d7062a49');
  });

  it('keySize 256 iterations 5', () => {
    expect(C.PBKDF2('password', C.enc.Hex.parse('1234567878563412'), { keySize: 256 / 32, iterations: 5 }).toString())
      .toBe('d1daa78615f287e6a1c8b120d7062a493f98d203e6be49a6adf4fa574b6e64ee');
  });

  it('keySize 128 iterations 1200 pass phrase equals block size', () => {
    expect(C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase equals block size', { keySize: 128 / 32, iterations: 1200 }).toString())
      .toBe('139c30c0966bc32ba55fdbf212530ac9');
  });

  it('keySize 256 iterations 1200 pass phrase equals block size', () => {
    expect(C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase equals block size', { keySize: 256 / 32, iterations: 1200 }).toString())
      .toBe('139c30c0966bc32ba55fdbf212530ac9c5ec59f1a452f5cc9ad940fea0598ed1');
  });

  it('keySize 128 iterations 1200 pass phrase exceeds block size', () => {
    expect(C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase exceeds block size', { keySize: 128 / 32, iterations: 1200 }).toString())
      .toBe('9ccad6d468770cd51b10e6a68721be61');
  });

  it('keySize 256 iterations 1200 pass phrase exceeds block size', () => {
    expect(C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase exceeds block size', { keySize: 256 / 32, iterations: 1200 }).toString())
      .toBe('9ccad6d468770cd51b10e6a68721be611a8b4d282601db3b36be9246915ec82a');
  });

  it('keySize 128 iterations 50', () => {
    expect(C.PBKDF2(C.enc.Hex.parse('f09d849e'), 'EXAMPLE.COMpianist', { keySize: 128 / 32, iterations: 50 }).toString())
      .toBe('6b9cf26d45455a43a5b8bb276a403b39');
  });

  it('keySize 256 iterations 50', () => {
    expect(C.PBKDF2(C.enc.Hex.parse('f09d849e'), 'EXAMPLE.COMpianist', { keySize: 256 / 32, iterations: 50 }).toString())
      .toBe('6b9cf26d45455a43a5b8bb276a403b39e7fe37a0c41e02c281ff3069e1e94f52');
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
