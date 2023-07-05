/**
 * SHA-3 hash algorithm.
 */
export class SHA3Algo extends Hasher {
    _doReset(): void;
    _state: any[];
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
 *     var hash = CryptoJS.SHA3('message');
 *     var hash = CryptoJS.SHA3(wordArray);
 */
export const SHA3: Function;
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
 *     var hmac = CryptoJS.HmacSHA3(message, key);
 */
export const HmacSHA3: Function;
import { Hasher } from './core.js';
import { WordArray } from './core.js';
