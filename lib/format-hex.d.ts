export namespace HexFormatter {
    /**
     * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
     *
     * @param {CipherParams} cipherParams The cipher params object.
     *
     * @return {string} The hexadecimally encoded string.
     *
     * @static
     *
     * @example
     *
     *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
     */
    function stringify(cipherParams: CipherParams): string;
    /**
     * Converts a hexadecimally encoded ciphertext string to a cipher params object.
     *
     * @param {string} input The hexadecimally encoded string.
     *
     * @return {CipherParams} The cipher params object.
     *
     * @static
     *
     * @example
     *
     *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
     */
    function parse(input: string): CipherParams;
}
import { CipherParams } from './cipher-core.js';
