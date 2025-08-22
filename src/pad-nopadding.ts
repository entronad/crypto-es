import { WordArray } from './core';
import { Padding } from './cipher-core';

/**
 * A noop padding strategy.
 */
export const NoPadding: Padding = {
  pad(_data: WordArray, _blockSize: number): void {
    // No operation
  },

  unpad(_data: WordArray): void {
    // No operation
  },
};