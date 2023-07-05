/**
 * DES block cipher algorithm.
 */
export class DESAlgo extends BlockCipher {
    _doReset(): void;
    _subKeys: any[];
    _invSubKeys: any[];
    encryptBlock(M: any, offset: any): void;
    decryptBlock(M: any, offset: any): void;
    _doCryptBlock(M: any, offset: any, subKeys: any): void;
    _lBlock: any;
    _rBlock: any;
}
export namespace DESAlgo {
    let keySize: number;
    let ivSize: number;
}
/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
 */
export const DES: any;
/**
 * Triple-DES block cipher algorithm.
 */
export class TripleDESAlgo extends BlockCipher {
    _doReset(): void;
    _des1: import("./cipher-core.js").Cipher;
    _des2: import("./cipher-core.js").Cipher;
    _des3: import("./cipher-core.js").Cipher;
    encryptBlock(M: any, offset: any): void;
    decryptBlock(M: any, offset: any): void;
}
export namespace TripleDESAlgo {
    let keySize_1: number;
    export { keySize_1 as keySize };
    let ivSize_1: number;
    export { ivSize_1 as ivSize };
}
/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
 */
export const TripleDES: any;
import { BlockCipher } from './cipher-core.js';
