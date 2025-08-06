import { WordArray } from './core.js';
import { Padding } from './cipher-core.js';

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