import {
  WordArray,
  HashFn,
  HMACHashFn,
} from './core';
import { SHA256Algo } from './sha256';

/**
 * SHA-224 hash algorithm.
 */
export class SHA224Algo extends SHA256Algo {
  _doReset(): void {
    this._hash = new WordArray([
      0xc1059ed8,
      0x367cd507,
      0x3070dd17,
      0xf70e5939,
      0xffc00b31,
      0x68581511,
      0x64f98fa7,
      0xbefa4fa4,
    ]);
  }

  _doFinalize(): WordArray {
    const hash = super._doFinalize.call(this);

    hash.sigBytes -= 4;

    return hash;
  }

  clone(): this {
    const clone = super.clone.call(this);
    return clone;
  }
}

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param message - The message to hash.
 * @returns The hash.
 *
 * @example
 * ```js
 * const hash = CryptoJS.SHA224('message');
 * const hash = CryptoJS.SHA224(wordArray);
 * ```
 */
export const SHA224: HashFn = SHA256Algo._createHelper(SHA224Algo);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param message - The message to hash.
 * @param key - The secret key.
 * @returns The HMAC.
 *
 * @example
 * ```js
 * const hmac = CryptoJS.HmacSHA224(message, key);
 * ```
 */
export const HmacSHA224: HMACHashFn = SHA256Algo._createHmacHelper(SHA224Algo);