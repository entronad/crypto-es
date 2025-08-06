import {
  BlockCipherMode,
  Cipher,
} from './cipher-core.ts';

function generateKeystreamAndEncrypt(
  this: BlockCipherMode,
  words: number[],
  offset: number,
  blockSize: number,
  cipher: Cipher
): void {
  const _words = words;
  let keystream: number[];

  // Shortcut
  const iv = this._iv;

  // Generate keystream
  if (iv) {
    keystream = iv.slice(0);

    // Remove IV for subsequent blocks
    this._iv = undefined;
  } else {
    keystream = this._prevBlock!;
  }
  cipher.encryptBlock!(keystream, 0);

  // Encrypt
  for (let i = 0; i < blockSize; i += 1) {
    _words[offset + i] ^= keystream[i];
  }
}

/**
 * Cipher Feedback block mode.
 */
export class CFB extends BlockCipherMode {
  static readonly Encryptor = class extends CFB {
    processBlock(words: number[], offset: number): void {
      // Shortcuts
      const cipher = this._cipher;
      const blockSize = cipher.blockSize!;

      generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

      // Remember this block to use with next block
      this._prevBlock = words.slice(offset, offset + blockSize);
    }
  };

  static readonly Decryptor = class extends CFB {
    processBlock(words: number[], offset: number): void {
      // Shortcuts
      const cipher = this._cipher;
      const blockSize = cipher.blockSize!;

      // Remember this block to use with next block
      const thisBlock = words.slice(offset, offset + blockSize);

      generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

      // This block becomes the previous block
      this._prevBlock = thisBlock;
    }
  };
}