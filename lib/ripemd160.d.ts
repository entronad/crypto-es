/**
 * RIPEMD160 hash algorithm.
 */
export class RIPEMD160Algo extends Hasher {
    _doReset(): void;
    _hash: any;
    _doProcessBlock(M: any, offset: any): void;
    _doFinalize(): any;
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
 *     var hash = CryptoJS.RIPEMD160('message');
 *     var hash = CryptoJS.RIPEMD160(wordArray);
 */
export const RIPEMD160: Function;
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
 *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
 */
export const HmacRIPEMD160: Function;
import { Hasher } from './core.js';
