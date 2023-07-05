/**
 * Password-Based Key Derivation Function 2 algorithm.
 */
export class PBKDF2Algo extends Base {
    /**
     * Initializes a newly created key derivation function.
     *
     * @param {Object} cfg (Optional) The configuration options to use for the derivation.
     *
     * @example
     *
     *     const kdf = CryptoJS.algo.PBKDF2.create();
     *     const kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
     *     const kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
     */
    constructor(cfg: any);
    /**
     * Configuration options.
     *
     * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
     * @property {Hasher} hasher The hasher to use. Default: SHA1
     * @property {number} iterations The number of iterations to perform. Default: 1
     */
    cfg: any;
    /**
     * Computes the Password-Based Key Derivation Function 2.
     *
     * @param {WordArray|string} password The password.
     * @param {WordArray|string} salt A salt.
     *
     * @return {WordArray} The derived key.
     *
     * @example
     *
     *     const key = kdf.compute(password, salt);
     */
    compute(password: WordArray | string, salt: WordArray | string): WordArray;
}
export function PBKDF2(password: WordArray | string, salt: WordArray | string, cfg: any): WordArray;
import { Base } from './core.js';
import { WordArray } from './core.js';
