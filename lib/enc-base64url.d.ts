export namespace Base64url {
    /**
     * Converts a word array to a Base64url string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @param {boolean} urlSafe Whether to use url safe.
     *
     * @return {string} The Base64url string.
     *
     * @static
     *
     * @example
     *
     *     const base64String = CryptoJS.enc.Base64.stringify(wordArray);
     */
    function stringify(wordArray: WordArray, urlSafe?: boolean): string;
    /**
     * Converts a Base64url string to a word array.
     *
     * @param {string} base64Str The Base64url string.
     *
     * @param {boolean} urlSafe Whether to use url safe.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     const wordArray = CryptoJS.enc.Base64.parse(base64String);
     */
    function parse(base64Str: string, urlSafe?: boolean): WordArray;
    let _map: string;
    let _safeMap: string;
}
import { WordArray } from './core.js';
