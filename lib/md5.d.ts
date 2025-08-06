import { WordArray, Hasher, HashFn, HMACHashFn } from './core.js';
/**
 * MD5 hash algorithm.
 */
export declare class MD5Algo extends Hasher {
    _doReset(): void;
    _doProcessBlock(M: number[], offset: number): void;
    _doFinalize(): WordArray;
    clone(): MD5Algo;
}
/**
 * Shortcut function to the hasher's object interface.
 *
 * @param message - The message to hash.
 * @returns The hash.
 *
 * @example
 * ```js
 * const hash = CryptoJS.MD5('message');
 * const hash = CryptoJS.MD5(wordArray);
 * ```
 */
export declare const MD5: HashFn;
/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param message - The message to hash.
 * @param key - The secret key.
 * @returns The HMAC.
 *
 * @example
 * ```js
 * const hmac = CryptoJS.HmacMD5(message, key);
 * ```
 */
export declare const HmacMD5: HMACHashFn;
