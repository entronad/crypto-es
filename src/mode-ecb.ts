import {
  BlockCipherMode,
} from './cipher-core';

/**
 * Electronic Codebook block mode.
 */
export class ECB extends BlockCipherMode {
  static readonly Encryptor = class extends ECB {
    processBlock(words: number[], offset: number): void {
      this._cipher.encryptBlock!(words, offset);
    }
  };

  static readonly Decryptor = class extends ECB {
    processBlock(words: number[], offset: number): void {
      this._cipher.decryptBlock!(words, offset);
    }
  };
}