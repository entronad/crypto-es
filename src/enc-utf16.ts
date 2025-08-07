import {
  WordArray,
  Encoder,
} from './core';

/**
 * Swaps endian of a word
 * @param word - The word to swap
 * @returns The word with swapped endian
 */
const swapEndian = (word: number): number => ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);

/**
 * UTF-16 BE encoding strategy.
 */
export const Utf16BE: Encoder = {
  /**
   * Converts a word array to a UTF-16 BE string.
   *
   * @param wordArray - The word array.
   * @returns The UTF-16 BE string.
   *
   * @example
   * ```js
   * const utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
   * ```
   */
  stringify(wordArray: WordArray): string {
    // Shortcuts
    const { words, sigBytes } = wordArray;

    // Convert
    const utf16Chars: string[] = [];
    for (let i = 0; i < sigBytes; i += 2) {
      const codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
      utf16Chars.push(String.fromCharCode(codePoint));
    }

    return utf16Chars.join('');
  },

  /**
   * Converts a UTF-16 BE string to a word array.
   *
   * @param utf16Str - The UTF-16 BE string.
   * @returns The word array.
   *
   * @example
   * ```js
   * const wordArray = CryptoJS.enc.Utf16.parse(utf16String);
   * ```
   */
  parse(utf16Str: string): WordArray {
    // Shortcut
    const utf16StrLength = utf16Str.length;

    // Convert
    const words: number[] = [];
    for (let i = 0; i < utf16StrLength; i += 1) {
      words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
    }

    return WordArray.create(words, utf16StrLength * 2);
  },
};

/**
 * UTF-16 encoding strategy (defaults to UTF-16 BE).
 */
export const Utf16: Encoder = Utf16BE;

/**
 * UTF-16 LE encoding strategy.
 */
export const Utf16LE: Encoder = {
  /**
   * Converts a word array to a UTF-16 LE string.
   *
   * @param wordArray - The word array.
   * @returns The UTF-16 LE string.
   *
   * @example
   * ```js
   * const utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
   * ```
   */
  stringify(wordArray: WordArray): string {
    // Shortcuts
    const { words, sigBytes } = wordArray;

    // Convert
    const utf16Chars: string[] = [];
    for (let i = 0; i < sigBytes; i += 2) {
      const codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
      utf16Chars.push(String.fromCharCode(codePoint));
    }

    return utf16Chars.join('');
  },

  /**
   * Converts a UTF-16 LE string to a word array.
   *
   * @param utf16Str - The UTF-16 LE string.
   * @returns The word array.
   *
   * @example
   * ```js
   * const wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
   * ```
   */
  parse(utf16Str: string): WordArray {
    // Shortcut
    const utf16StrLength = utf16Str.length;

    // Convert
    const words: number[] = [];
    for (let i = 0; i < utf16StrLength; i += 1) {
      words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
    }

    return WordArray.create(words, utf16StrLength * 2);
  },
};