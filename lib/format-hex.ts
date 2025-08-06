import {
  CipherParams,
  Format,
} from './cipher-core.js';
import {
  Hex,
} from './core.js';

/**
 * Hex formatter for cipher params.
 * Converts cipher params to/from hexadecimal strings.
 */
export const HexFormatter: Format = {
  /**
   * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
   *
   * @param cipherParams - The cipher params object.
   * @returns The hexadecimally encoded string.
   *
   * @example
   * ```js
   * const hexString = CryptoJS.format.Hex.stringify(cipherParams);
   * ```
   */
  stringify(cipherParams: CipherParams): string {
    return cipherParams.ciphertext.toString(Hex);
  },

  /**
   * Converts a hexadecimally encoded ciphertext string to a cipher params object.
   *
   * @param input - The hexadecimally encoded string.
   * @returns The cipher params object.
   *
   * @example
   * ```js
   * const cipherParams = CryptoJS.format.Hex.parse(hexString);
   * ```
   */
  parse(input: string): CipherParams {
    const ciphertext = Hex.parse(input);
    return CipherParams.create({ ciphertext });
  },
};