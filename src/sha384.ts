import {
  WordArray,
  HashFn,
  HMACHashFn,
} from './core';
import {
  X64Word,
  X64WordArray,
} from './x64-core';
import { SHA512Algo } from './sha512';

/**
 * SHA-384 hash algorithm.
 */
export class SHA384Algo extends SHA512Algo {
  _doReset(): void {
    this._hash = new X64WordArray([
      new X64Word(0xcbbb9d5d, 0xc1059ed8),
      new X64Word(0x629a292a, 0x367cd507),
      new X64Word(0x9159015a, 0x3070dd17),
      new X64Word(0x152fecd8, 0xf70e5939),
      new X64Word(0x67332667, 0xffc00b31),
      new X64Word(0x8eb44a87, 0x68581511),
      new X64Word(0xdb0c2e0d, 0x64f98fa7),
      new X64Word(0x47b5481d, 0xbefa4fa4),
    ]);
  }

  _doFinalize(): WordArray {
    const hash = super._doFinalize.call(this);

    hash.sigBytes -= 16;

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
 * const hash = CryptoJS.SHA384('message');
 * const hash = CryptoJS.SHA384(wordArray);
 * ```
 */
export const SHA384: HashFn = SHA512Algo._createHelper(SHA384Algo);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param message - The message to hash.
 * @param key - The secret key.
 * @returns The HMAC.
 *
 * @example
 * ```js
 * const hmac = CryptoJS.HmacSHA384(message, key);
 * ```
 */
export const HmacSHA384: HMACHashFn = SHA512Algo._createHmacHelper(SHA384Algo);