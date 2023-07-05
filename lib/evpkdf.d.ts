/**
 * This key derivation function is meant to conform with EVP_BytesToKey.
 * www.openssl.org/docs/crypto/EVP_BytesToKey.html
 */
export class EvpKDFAlgo extends Base {
    /**
     * Initializes a newly created key derivation function.
     *
     * @param {Object} cfg (Optional) The configuration options to use for the derivation.
     *
     * @example
     *
     *     const kdf = CryptoJS.algo.EvpKDF.create();
     *     const kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
     *     const kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
     */
    constructor(cfg: any);
    /**
     * Configuration options.
     *
     * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
     * @property {Hasher} hasher The hash algorithm to use. Default: MD5
     * @property {number} iterations The number of iterations to perform. Default: 1
     */
    cfg: any;
    /**
     * Derives a key from a password.
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
export function EvpKDF(password: WordArray | string, salt: WordArray | string, cfg: any): WordArray;
import { Base } from './core.js';
import { WordArray } from './core.js';
