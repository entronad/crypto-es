import {
  StreamCipher,
  CipherObj,
  CipherCfg,
  WordArray,
} from './cipher-core';

interface RC4DropCfg extends CipherCfg {
  drop?: number;
}


/**
 * RC4 stream cipher algorithm.
 */
export class RC4Algo extends StreamCipher {
  static keySize = 256 / 32;
  static ivSize = 0;

  protected _S!: number[];
  protected _i!: number;
  protected _j!: number;

  protected generateKeystreamWord(): number {
    // Shortcuts
    const S = this._S;
    let i = this._i;
    let j = this._j;

    // Generate keystream word
    let keystreamWord = 0;
    for (let n = 0; n < 4; n += 1) {
      i = (i + 1) % 256;
      j = (j + S[i]) % 256;

      // Swap
      const t = S[i];
      S[i] = S[j];
      S[j] = t;

      keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
    }

    // Update counters
    this._i = i;
    this._j = j;

    return keystreamWord;
  }

  protected _doReset(): void {
    // Shortcuts
    const key = this._key;
    const keyWords = key.words;
    const keySigBytes = key.sigBytes;

    // Init sbox
    this._S = [];
    const S = this._S;
    for (let i = 0; i < 256; i += 1) {
      S[i] = i;
    }

    // Key setup
    for (let i = 0, j = 0; i < 256; i += 1) {
      const keyByteIndex = i % keySigBytes;
      const keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

      j = (j + S[i] + keyByte) % 256;

      // Swap
      const t = S[i];
      S[i] = S[j];
      S[j] = t;
    }

    // Counters
    this._j = 0;
    this._i = this._j;
  }

  protected _doProcessBlock(M: number[], offset: number): void {
    const _M = M;

    _M[offset] ^= this.generateKeystreamWord();
  }
}

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
 */
export const RC4: CipherObj = StreamCipher._createHelper(RC4Algo);

/**
 * Modified RC4 stream cipher algorithm.
 */
export class RC4DropAlgo extends RC4Algo {
  declare cfg: RC4DropCfg;
  
  constructor(xformMode: number, key: WordArray, cfg?: RC4DropCfg) {
    super(xformMode, key, cfg);

    /**
     * Configuration options.
     *
     * @property {number} drop The number of keystream words to drop. Default 192
     */
    // Only set default drop if not provided in cfg
    if (this.cfg.drop === undefined) {
      this.cfg.drop = 192;
    }
  }

  protected _doReset(): void {
    super._doReset();

    // Drop
    const dropCount = this.cfg.drop || 192;
    for (let i = dropCount; i > 0; i -= 1) {
      this.generateKeystreamWord();
    }
  }
}

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
 */
export const RC4Drop: CipherObj = StreamCipher._createHelper(RC4DropAlgo);