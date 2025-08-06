import {
  WordArray,
} from './core';
import { Padding } from './cipher-core';

/**
 * ISO 10126 padding strategy.
 */
export const Iso10126: Padding = {
  pad(data: WordArray, blockSize: number): void {
    // Shortcut
    const blockSizeBytes = blockSize * 4;

    // Count padding bytes
    const nPaddingBytes = blockSizeBytes - (data.sigBytes % blockSizeBytes);

    // Pad
    data
      .concat(WordArray.random(nPaddingBytes - 1))
      .concat(WordArray.create([nPaddingBytes << 24], 1));
  },

  unpad(data: WordArray): void {
    const _data = data;
    // Get number of padding bytes from last byte
    const nPaddingBytes = _data.words[(_data.sigBytes - 1) >>> 2] & 0xff;

    // Remove padding
    _data.sigBytes -= nPaddingBytes;
  },
};