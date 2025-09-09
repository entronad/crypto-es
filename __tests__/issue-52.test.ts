/* eslint-disable no-undef */
import { AES, CTR, NoPadding, Hex, WordArray } from '../src/index';

describe('issue-52: AES.encrypt should produce stable ciphertext without toString side effects', () => {
  it('ciphertext.words and sigBytes remain unchanged after toString (CTR + NoPadding)', () => {
    const message = 'hello'; // 5 bytes, not multiple of 4 to exercise partial word
    const key = Hex.parse('000102030405060708090a0b0c0d0e0f'); // 16 bytes
    const iv = Hex.parse('101112131415161718191a1b1c1d1e1f'); // 16 bytes

    const encrypted = AES.encrypt(message, key, { iv, mode: CTR, padding: NoPadding });

    // Sanity: ciphertext present
    expect(encrypted.ciphertext).toBeInstanceOf(WordArray);

    const beforeSigBytes = encrypted.ciphertext!.sigBytes;
    const beforeWords = encrypted.ciphertext!.words.slice();
    const beforeLen = beforeWords.length;

    // sigBytes should match plaintext length for CTR + NoPadding
    expect(beforeSigBytes).toBe(message.length);
    // words should already be clamped to a stable length
    expect(beforeLen).toBe(Math.ceil(beforeSigBytes / 4));

    // Trigger toString (previously caused mutation via clamp inside Base64 stringify)
    void encrypted.toString();

    const afterSigBytes = encrypted.ciphertext!.sigBytes;
    const afterWords = encrypted.ciphertext!.words.slice();
    const afterLen = afterWords.length;

    // No changes expected
    expect(afterSigBytes).toBe(beforeSigBytes);
    expect(afterLen).toBe(beforeLen);
    expect(afterWords).toEqual(beforeWords);
  });
});

