import {
  Base,
  WordArray,
  Hasher,
} from './core';
import { SHA256Algo } from './sha256';
import { HMAC } from './hmac';

interface PBKDF2Cfg {
  keySize?: number;
  hasher?: typeof SHA256Algo;
  iterations?: number;
}

/**
 * Password-Based Key Derivation Function 2 algorithm.
 */
export class PBKDF2Algo extends Base {
  cfg: PBKDF2Cfg;

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
  constructor(cfg?: PBKDF2Cfg) {
    super();

    /**
     * Configuration options.
     * 
     * The default `hasher` and `interations` is different from CryptoJs to enhance security:
     * https://github.com/entronad/crypto-es/security/advisories/GHSA-mpj8-q39x-wq5h
     *
     * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
     * @property {Hasher} hasher The hasher to use. Default: SHA256
     * @property {number} iterations The number of iterations to perform. Default: 250000
     */
    this.cfg = Object.assign(
      {},
      {
        keySize: 128 / 32,
        hasher: SHA256Algo,
        iterations: 250000,
      },
      cfg,
    );
  }

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
  compute(password: WordArray | string, salt: WordArray | string): WordArray {
    // Shortcut
    const { cfg } = this;

    // Init HMAC
    const hmac = HMAC.create(cfg.hasher!, password);

    // Initial values
    const derivedKey = WordArray.create();
    const blockIndex = WordArray.create([0x00000001]);

    // Shortcuts
    const derivedKeyWords = derivedKey.words;
    const blockIndexWords = blockIndex.words;
    const { keySize, iterations } = cfg;

    // Generate key
    while (derivedKeyWords.length < keySize!) {
      const block = hmac.update(salt).finalize(blockIndex);
      hmac.reset();

      // Shortcuts
      const blockWords = block.words;
      const blockWordsLength = blockWords.length;

      // Iterations
      let intermediate = block;
      for (let i = 1; i < iterations!; i += 1) {
        intermediate = hmac.finalize(intermediate);
        hmac.reset();

        // Shortcut
        const intermediateWords = intermediate.words;

        // XOR intermediate with block
        for (let j = 0; j < blockWordsLength; j += 1) {
          blockWords[j] ^= intermediateWords[j];
        }
      }

      derivedKey.concat(block);
      blockIndexWords[0] += 1;
    }
    derivedKey.sigBytes = keySize! * 4;

    return derivedKey;
  }
}

/**
 * Computes the Password-Based Key Derivation Function 2.
 *
 * @param {WordArray|string} password The password.
 * @param {WordArray|string} salt A salt.
 * @param {Object} cfg (Optional) The configuration options to use for this computation.
 *
 * @return {WordArray} The derived key.
 *
 * @static
 *
 * @example
 *
 *     var key = CryptoJS.PBKDF2(password, salt);
 *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
 *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
 */
export const PBKDF2 = (password: WordArray | string, salt: WordArray | string, cfg?: PBKDF2Cfg): WordArray => new PBKDF2Algo(cfg).compute(password, salt);