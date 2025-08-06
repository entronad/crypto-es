import { WordArray, HashFn, HMACHashFn } from './core.js';
import { SHA256Algo } from './sha256.js';
/**
 * SHA-224 hash algorithm.
 */
export declare class SHA224Algo extends SHA256Algo {
    _doReset(): void;
    _doFinalize(): WordArray;
    clone(): SHA224Algo;
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
export declare const SHA224: HashFn;
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
export declare const HmacSHA224: HMACHashFn;
