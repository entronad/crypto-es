import {
  WordArray,
} from './core.ts';
import { Padding } from './cipher-core.ts';
import {
  ZeroPadding,
} from './pad-zeropadding.ts';

/**
 * ISO/IEC 9797-1 Padding Method 2.
 */
export const Iso97971: Padding = {
  pad(data: WordArray, blockSize: number): void {
    // Add 0x80 byte
    data.concat(WordArray.create([0x80000000], 1));

    // Zero pad the rest
    ZeroPadding.pad(data, blockSize);
  },

  unpad(data: WordArray): void {
    const _data = data;

    // Remove zero padding
    ZeroPadding.unpad(_data);

    // Remove one more byte -- the 0x80 byte
    _data.sigBytes -= 1;
  },
};