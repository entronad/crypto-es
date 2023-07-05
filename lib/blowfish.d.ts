/**
 * Blowfish block cipher algorithm.
 */
export class BlowfishAlgo extends BlockCipher {
    _doReset(): void;
    _keyPriorReset: any;
    encryptBlock(M: any, offset: any): void;
    decryptBlock(M: any, offset: any): void;
}
export namespace BlowfishAlgo {
    let keySize: number;
    let ivSize: number;
}
/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.Blowfish.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.Blowfish.decrypt(ciphertext, key, cfg);
 */
export const Blowfish: any;
import { BlockCipher } from './cipher-core.js';
