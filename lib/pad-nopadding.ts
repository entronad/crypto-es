import { WordArray } from './core.ts';
import { Padding } from './cipher-core.ts';

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