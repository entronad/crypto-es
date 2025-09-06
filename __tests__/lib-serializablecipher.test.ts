/* eslint-disable no-undef */
import { AESAlgo, CipherParams, OpenSSLFormatter, SerializableCipher, WordArray } from '../src/index';

const data: any = {};

beforeAll(() => {
  data.message = WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);
  data.key = WordArray.create([0x10111213, 0x14151617, 0x18191a1b, 0x1c1d1e1f]);
  data.iv = WordArray.create([0x20212223, 0x24252627, 0x28292a2b, 0x2c2d2e2f]);
});

describe('lib-serializablecipher', () => {
  it('encrypt', () => {
    // Compute expected
    const aes = AESAlgo.createEncryptor(data.key, { iv: data.iv });
    const ciphertext = aes.finalize(data.message);
    const expected = CipherParams.create({
      ciphertext,
      key: data.key,
      iv: data.iv,
      algorithm: AESAlgo,
      mode: aes.cfg.mode,
      padding: aes.cfg.padding,
      blockSize: aes.blockSize,
      formatter: OpenSSLFormatter,
    });

    // Compute actual
    const actual = SerializableCipher.encrypt(
      AESAlgo,
      data.message,
      data.key,
      { iv: data.iv },
    );

    expect(actual.toString()).toBe(expected.toString());
    expect(actual.ciphertext!.toString()).toBe(expected.ciphertext!.toString());
    expect(actual.key!.toString()).toBe(expected.key!.toString());
    expect(actual.iv!.toString()).toBe(expected.iv!.toString());
    expect(actual.algorithm).toBe(expected.algorithm);
    expect(actual.mode).toBe(expected.mode);
    expect(actual.padding).toBe(expected.padding);
    expect(actual.blockSize).toBe(expected.blockSize);
  });

  it('decrypt', () => {
    const encrypted = String(SerializableCipher.encrypt(
      AESAlgo,
      data.message,
      data.key,
      { iv: data.iv },
    ));
    const decrypted = SerializableCipher.decrypt(
      AESAlgo,
      encrypted,
      data.key,
      { iv: data.iv },
    );

    expect(decrypted.toString()).toBe(data.message.toString());
  });
});
