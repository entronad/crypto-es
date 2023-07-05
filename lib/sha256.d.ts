/**
 * SHA-256 hash algorithm.
 */
export class SHA256Algo extends Hasher {
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
 *     var hash = CryptoJS.SHA256('message');
 *     var hash = CryptoJS.SHA256(wordArray);
 */
export const SHA256: Function;
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
 *     var hmac = CryptoJS.HmacSHA256(message, key);
 */
export const HmacSHA256: Function;
import { Hasher } from './core.js';
import { WordArray } from './core.js';
