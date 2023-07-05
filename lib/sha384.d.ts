/**
 * SHA-384 hash algorithm.
 */
export class SHA384Algo extends SHA512Algo {
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
 *     var hash = CryptoJS.SHA384('message');
 *     var hash = CryptoJS.SHA384(wordArray);
 */
export const SHA384: Function;
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
 *     var hmac = CryptoJS.HmacSHA384(message, key);
 */
export const HmacSHA384: Function;
import { SHA512Algo } from './sha512.js';
