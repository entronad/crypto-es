import { WordArray, Hasher, HashFn, HMACHashFn } from './core.js';
/**
 * SHA-256 hash algorithm.
 */
export declare class SHA256Algo extends Hasher {
    _doReset(): void;
    _doProcessBlock(M: number[], offset: number): void;
    _doFinalize(): WordArray;
    clone(): SHA256Algo;
}
/**
 * Shortcut function to the hasher's object interface.
 *
 * @param message - The message to hash.
 * @returns The hash.
 *
 * @example
 * ```js
 * const hash = CryptoJS.SHA256('message');
 * const hash = CryptoJS.SHA256(wordArray);
 * ```
 */
export declare const SHA256: HashFn;
/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param message - The message to hash.
 * @param key - The secret key.
 * @returns The HMAC.
 *
 * @example
 * ```js
 * const hmac = CryptoJS.HmacSHA256(message, key);
 * ```
 */
export declare const HmacSHA256: HMACHashFn;
