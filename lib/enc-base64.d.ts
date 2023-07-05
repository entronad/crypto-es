export function parseLoop(base64Str: any, base64StrLength: any, reverseMap: any): any;
export namespace Base64 {
    /**
     * Converts a word array to a Base64 string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The Base64 string.
     *
     * @static
     *
     * @example
     *
     *     const base64String = CryptoJS.enc.Base64.stringify(wordArray);
     */
    function stringify(wordArray: WordArray): string;
    /**
     * Converts a Base64 string to a word array.
     *
     * @param {string} base64Str The Base64 string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     const wordArray = CryptoJS.enc.Base64.parse(base64String);
     */
    function parse(base64Str: string): WordArray;
    let _map: string;
}
import { WordArray } from './core.js';
