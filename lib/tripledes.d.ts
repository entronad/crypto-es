import { WordArray } from './core.js';
import { BlockCipher, CipherObj, CipherCfg } from './cipher-core.js';
/**
 * DES block cipher algorithm.
 */
export declare class DESAlgo extends BlockCipher {
    /** Key size in 32-bit words */
    static keySize: number;
    /** IV size in 32-bit words */
    static ivSize: number;
    /** Block size in 32-bit words */
    blockSize: number;
    /** Subkeys for encryption */
    private _subKeys?;
    /** Inverse subkeys for decryption */
    private _invSubKeys?;
    /** Left block for processing */
    private _lBlock?;
    /** Right block for processing */
    private _rBlock?;
    constructor(xformMode: number, key: WordArray, cfg?: CipherCfg);
    protected _doReset(): void;
    encryptBlock(M: number[], offset: number): void;
    decryptBlock(M: number[], offset: number): void;
    private _doCryptBlock;
}
/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
 */
export declare const DES: CipherObj;
/**
 * Triple-DES block cipher algorithm.
 */
export declare class TripleDESAlgo extends BlockCipher {
    /** Key size in 32-bit words */
    static keySize: number;
    /** IV size in 32-bit words */
    static ivSize: number;
    /** Block size in 32-bit words */
    blockSize: number;
    /** First DES instance */
    private _des1?;
    /** Second DES instance */
    private _des2?;
    /** Third DES instance */
    private _des3?;
    protected _doReset(): void;
    encryptBlock(M: number[], offset: number): void;
    decryptBlock(M: number[], offset: number): void;
}
/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
 */
export declare const TripleDES: CipherObj;
