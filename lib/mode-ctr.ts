import {
  BlockCipherMode,
} from './cipher-core.ts';

/**
 * Counter block mode.
 */
export class CTR extends BlockCipherMode {
  /** Counter for CTR mode */
  protected _counter?: number[];

  static readonly Encryptor = class extends CTR {
    processBlock(words: number[], offset: number): void {
      const _words = words;

      // Shortcuts
      const cipher = this._cipher;
      const blockSize = cipher.blockSize!;
      const iv = this._iv;
      let counter = this._counter;

      // Generate keystream
      if (iv) {
        this._counter = iv.slice(0);
        counter = this._counter;

        // Remove IV for subsequent blocks
        this._iv = undefined;
      }
      const keystream = counter!.slice(0);
      cipher.encryptBlock!(keystream, 0);

      // Increment counter
      counter![blockSize - 1] = (counter![blockSize - 1] + 1) | 0;

      // Encrypt
      for (let i = 0; i < blockSize; i += 1) {
        _words[offset + i] ^= keystream[i];
      }
    }
  };

  static readonly Decryptor = CTR.Encryptor;
}