import {
  BlockCipherMode,
} from './cipher-core';

/**
 * OFB Encryptor/Decryptor (same operation)
 */
class OFBMode extends BlockCipherMode {
  /** Keystream for OFB mode */
  _keystream?: number[];

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
    } else if (!keystream) {
      // If no IV and no existing keystream, initialize with zeros
      this._keystream = new Array(blockSize).fill(0);
      keystream = this._keystream;
    }
    cipher.encryptBlock!(keystream!, 0);

    // Encrypt
    for (let i = 0; i < blockSize; i += 1) {
      _words[offset + i] ^= keystream![i];
    }
  }
}

/**
 * Output Feedback block mode.
 */
export class OFB extends BlockCipherMode {
  /** Keystream for OFB mode */
  _keystream?: number[];

  static readonly Encryptor = OFBMode;
  static readonly Decryptor = OFBMode;
}