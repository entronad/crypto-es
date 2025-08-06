import { WordArray, Encoder } from './core.js';
/**
 * Parses a Base64 string to a WordArray.
 * Helper function for Base64 decoding.
 *
 * @param base64Str - The Base64 string to parse
 * @param base64StrLength - The length of the Base64 string
 * @param reverseMap - The reverse character map for decoding
 * @returns The decoded WordArray
 */
export declare const parseLoop: (base64Str: string, base64StrLength: number, reverseMap: number[]) => WordArray;
/**
 * Base64 encoding strategy.
 * Converts between WordArrays and Base64 strings.
 *
 * @example
 * ```javascript
 * // Encoding
 * const base64String = Base64.stringify(wordArray);
 *
 * // Decoding
 * const wordArray = Base64.parse(base64String);
 * ```
 */
export declare const Base64: Encoder;
