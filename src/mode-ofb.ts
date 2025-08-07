import {
  BlockCipherMode,
} from './cipher-core';

/**
 * Output Feedback block mode.
 */
export class OFB extends BlockCipherMode {
  /** Keystream for OFB mode */
  _keystream?: number[];

  static readonly Encryptor = class extends OFB {
    processBlock(words: number[], offset: number): void {
      const _words = words;

      // Shortcuts
      const cipher = this._cipher;
      const blockSize = cipher.blockSize!;
      const iv = this._iv;
      let keystream = this._keystream;

      // Generate keystream
      if (iv) {
        this._keystream = iv.slice(0);
        keystream = this._keystream;

        // Remove IV for subsequent blocks
        this._iv = undefined;
      }
      cipher.encryptBlock!(keystream!, 0);

      // Encrypt
      for (let i = 0; i < blockSize; i += 1) {
        _words[offset + i] ^= keystream![i];
      }
    }
  };

  static readonly Decryptor = OFB.Encryptor;
}