import { WordArray, Encoder } from './core.js';
/**
 * Extended encoder interface for Base64url with URL-safe option
 */
interface Base64urlEncoder extends Encoder {
    /**
     * Converts a word array to a Base64url string
     * @param wordArray - The word array to convert
     * @param urlSafe - Whether to use URL-safe encoding (default: true)
     * @returns The Base64url string
     */
    stringify(wordArray: WordArray, urlSafe?: boolean): string;
    /**
     * Converts a Base64url string to a word array
     * @param base64Str - The Base64url string to parse
     * @param urlSafe - Whether to use URL-safe decoding (default: true)
     * @returns The word array
     */
    parse(base64Str: string, urlSafe?: boolean): WordArray;
}
/**
 * Base64url encoding strategy.
 * Provides URL-safe Base64 encoding/decoding that can be used in URLs without escaping.
 *
 * The URL-safe variant:
 * - Uses '-' instead of '+'
 * - Uses '_' instead of '/'
 * - Omits padding '=' characters
 *
 * @example
 * ```javascript
 * // URL-safe encoding (default)
 * const urlSafeString = Base64url.stringify(wordArray);
 * const wordArray = Base64url.parse(urlSafeString);
 *
 * // Standard Base64 encoding
 * const base64String = Base64url.stringify(wordArray, false);
 * const wordArray = Base64url.parse(base64String, false);
 * ```
 */
export declare const Base64url: Base64urlEncoder;
export {};
