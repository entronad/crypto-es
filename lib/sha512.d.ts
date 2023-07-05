/**
 * SHA-512 hash algorithm.
 */
export class SHA512Algo extends Hasher {
    constructor();
    _doReset(): void;
    _hash: X64WordArray;
    _doProcessBlock(M: any, offset: any): void;
    _doFinalize(): CryptoJS.lib.WordArray;
}
/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.SHA512('message');
 *     var hash = CryptoJS.SHA512(wordArray);
 */
export const SHA512: Function;
/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA512(message, key);
 */
export const HmacSHA512: Function;
import { Hasher } from './core.js';
import { X64WordArray } from './x64-core.js';
