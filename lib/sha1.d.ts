import { WordArray, Hasher, HashFn, HMACHashFn } from './core.js';
/**
 * SHA-1 hash algorithm.
 */
export declare class SHA1Algo extends Hasher {
    _doReset(): void;
    _doProcessBlock(M: number[], offset: number): void;
    _doFinalize(): WordArray;
    clone(): SHA1Algo;
}
/**
 * Shortcut function to the hasher's object interface.
 *
 * @param message - The message to hash.
 * @returns The hash.
 *
 * @example
 * ```js
 * const hash = CryptoJS.SHA1('message');
 * const hash = CryptoJS.SHA1(wordArray);
 * ```
 */
export declare const SHA1: HashFn;
/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param message - The message to hash.
 * @param key - The secret key.
 * @returns The HMAC.
 *
 * @example
 * ```js
 * const hmac = CryptoJS.HmacSHA1(message, key);
 * ```
 */
export declare const HmacSHA1: HMACHashFn;
