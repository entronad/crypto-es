import { Hasher, WordArray, HashFn, HMACHashFn } from './core.js';
import { X64WordArray } from './x64-core.js';
/**
 * SHA-512 hash algorithm.
 */
export declare class SHA512Algo extends Hasher {
    _hash: X64WordArray;
    constructor();
    _doReset(): void;
    _doProcessBlock(M: number[], offset: number): void;
    _doFinalize(): WordArray;
    clone(): SHA512Algo;
}
/**
 * Shortcut function to the hasher's object interface.
 *
 * @param message - The message to hash.
 * @returns The hash.
 *
 * @example
 * ```js
 * const hash = CryptoJS.SHA512('message');
 * const hash = CryptoJS.SHA512(wordArray);
 * ```
 */
export declare const SHA512: HashFn;
/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param message - The message to hash.
 * @param key - The secret key.
 * @returns The HMAC.
 *
 * @example
 * ```js
 * const hmac = CryptoJS.HmacSHA512(message, key);
 * ```
 */
export declare const HmacSHA512: HMACHashFn;
