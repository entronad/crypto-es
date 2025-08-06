import { WordArray, Hasher, HashFn, HMACHashFn } from './core.js';
interface SHA3Config {
    outputLength?: number;
}
/**
 * SHA-3 hash algorithm.
 */
export declare class SHA3Algo extends Hasher {
    cfg: SHA3Config;
    private _state;
    /**
     * Initializes a newly created hasher.
     *
     * @param cfg - Configuration options.
     * @property {number} outputLength - The desired number of bits in the output hash.
     *   Only values permitted are: 224, 256, 384, 512.
     *   Default: 512
     */
    constructor(cfg?: SHA3Config);
    _doReset(): void;
    _doProcessBlock(M: number[], offset: number): void;
    _doFinalize(): WordArray;
    clone(): SHA3Algo;
}
/**
 * Shortcut function to the hasher's object interface.
 *
 * @param message - The message to hash.
 * @returns The hash.
 *
 * @example
 * ```js
 * const hash = CryptoJS.SHA3('message');
 * const hash = CryptoJS.SHA3(wordArray);
 * ```
 */
export declare const SHA3: HashFn;
/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param message - The message to hash.
 * @param key - The secret key.
 * @returns The HMAC.
 *
 * @example
 * ```js
 * const hmac = CryptoJS.HmacSHA3(message, key);
 * ```
 */
export declare const HmacSHA3: HMACHashFn;
export {};
