export namespace Utf16BE {
    /**
     * Converts a word array to a UTF-16 BE string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The UTF-16 BE string.
     *
     * @static
     *
     * @example
     *
     *     const utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
     */
    function stringify(wordArray: WordArray): string;
    /**
     * Converts a UTF-16 BE string to a word array.
     *
     * @param {string} utf16Str The UTF-16 BE string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     const wordArray = CryptoJS.enc.Utf16.parse(utf16String);
     */
    function parse(utf16Str: string): WordArray;
}
export namespace Utf16 { }
export namespace Utf16LE {
    /**
     * Converts a word array to a UTF-16 LE string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The UTF-16 LE string.
     *
     * @static
     *
     * @example
     *
     *     const utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
     */
    function stringify(wordArray: WordArray): string;
    /**
     * Converts a UTF-16 LE string to a word array.
     *
     * @param {string} utf16Str The UTF-16 LE string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     const wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
     */
    function parse(utf16Str: string): WordArray;
}
import { WordArray } from './core.js';
