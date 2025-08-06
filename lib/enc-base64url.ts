import {
  WordArray,
  Encoder,
} from './core.js';
import {
  parseLoop,
} from './enc-base64.js';

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
 * Base64url encoding strategy implementation.
 * @private
 */
class Base64urlImpl implements Base64urlEncoder {
  /** Standard Base64 character map */
  private _map: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  
  /** URL-safe Base64 character map (no padding) */
  private _safeMap: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  
  /** Reverse character map for decoding */
  private _reverseMap?: number[];

  /**
   * Converts a word array to a Base64url string.
   * 
   * @param wordArray - The word array to convert
   * @param urlSafe - Whether to use URL-safe encoding (default: true)
   * @returns The Base64url string representation
   * @example
   * ```javascript
   * // URL-safe encoding (default)
   * const base64urlString = Base64url.stringify(wordArray);
   * 
   * // Standard Base64 encoding
   * const base64String = Base64url.stringify(wordArray, false);
   * ```
   */
  stringify(wordArray: WordArray, urlSafe: boolean = true): string {
    // Shortcuts
    const { words, sigBytes } = wordArray;
    const map = urlSafe ? this._safeMap : this._map;

    // Clamp excess bits
    wordArray.clamp();

    // Convert
    const base64Chars: string[] = [];
    for (let i = 0; i < sigBytes; i += 3) {
      const byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      const byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
      const byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

      const triplet = (byte1 << 16) | (byte2 << 8) | byte3;

      for (let j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j += 1) {
        base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
      }
    }

    // Add padding (only for standard Base64)
    const paddingChar = map.charAt(64);
    if (paddingChar) {
      while (base64Chars.length % 4) {
        base64Chars.push(paddingChar);
      }
    }

    return base64Chars.join('');
  }

  /**
   * Converts a Base64url string to a word array.
   * 
   * @param base64Str - The Base64url string to parse
   * @param urlSafe - Whether to use URL-safe decoding (default: true)
   * @returns The word array representation
   * @example
   * ```javascript
   * // URL-safe decoding (default)
   * const wordArray = Base64url.parse(base64urlString);
   * 
   * // Standard Base64 decoding
   * const wordArray = Base64url.parse(base64String, false);
   * ```
   */
  parse(base64Str: string, urlSafe: boolean = true): WordArray {
    // Shortcuts
    let base64StrLength = base64Str.length;
    const map = urlSafe ? this._safeMap : this._map;
    let reverseMap = this._reverseMap;

    // Build reverse map if not cached
    if (!reverseMap) {
      this._reverseMap = [];
      reverseMap = this._reverseMap;
      for (let j = 0; j < map.length; j += 1) {
        reverseMap[map.charCodeAt(j)] = j;
      }
    }

    // Ignore padding
    const paddingChar = map.charAt(64);
    if (paddingChar) {
      const paddingIndex = base64Str.indexOf(paddingChar);
      if (paddingIndex !== -1) {
        base64StrLength = paddingIndex;
      }
    }

    // Convert
    return parseLoop(base64Str, base64StrLength, reverseMap);
  }
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
export const Base64url: Base64urlEncoder = new Base64urlImpl();