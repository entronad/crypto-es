/**
 * SHA-1 hash algorithm.
 */
export class SHA1Algo extends Hasher {
    _doReset(): void;
    _hash: WordArray;
    _doProcessBlock(M: any, offset: any): void;
    _doFinalize(): WordArray;
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
 *     var hash = CryptoJS.SHA1('message');
 *     var hash = CryptoJS.SHA1(wordArray);
 */
export const SHA1: Function;
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
 *     var hmac = CryptoJS.HmacSHA1(message, key);
 */
export const HmacSHA1: Function;
import { Hasher } from './core.js';
import { WordArray } from './core.js';
