/**
 * Rabbit stream cipher algorithm.
 *
 * This is a legacy version that neglected to convert the key to little-endian.
 * This error doesn't affect the cipher's security,
 * but it does affect its compatibility with other implementations.
 */
export class RabbitLegacyAlgo extends StreamCipher {
    ivSize: number;
    _doReset(): void;
    _X: any[];
    _C: number[];
    _b: number;
    _doProcessBlock(M: any, offset: any): void;
}
/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
 */
export const RabbitLegacy: any;
import { StreamCipher } from './cipher-core.js';
