import { WordArray } from './core';
import { Padding } from './cipher-core';

/**
 * A noop padding strategy.
 */
export const NoPadding: Padding = {
  pad(data: WordArray, blockSize: number): void {
    // No operation
  },

  unpad(data: WordArray): void {
    // No operation
  },
};