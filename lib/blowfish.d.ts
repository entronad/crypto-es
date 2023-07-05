import {
  CipherObj,
  BlockCipher,
} from './cipher-core';

/**
 * Blowfish block cipher algorithm.
 */
export class BlowfishAlgo extends BlockCipher {}

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.Blowfish.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.Blowfish.decrypt(ciphertext, key, cfg);
 */
export const Blowfish: CipherObj;
