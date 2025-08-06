import { WordArray, HashFn, HMACHashFn } from './core.js';
import { SHA512Algo } from './sha512.js';
/**
 * SHA-384 hash algorithm.
 */
export declare class SHA384Algo extends SHA512Algo {
    _doReset(): void;
    _doFinalize(): WordArray;
    clone(): SHA384Algo;
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
export declare const SHA384: HashFn;
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
export declare const HmacSHA384: HMACHashFn;
