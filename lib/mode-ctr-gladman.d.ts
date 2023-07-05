/** @preserve
 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
 * derived from CryptoJS.mode.CTR
 * Jan Hruby jhruby.web@gmail.com
 */
export class CTRGladman extends BlockCipherMode {
}
export namespace CTRGladman {
    export { Encryptor };
    import Decryptor = Encryptor;
    export { Decryptor };
}
import { BlockCipherMode } from './cipher-core.js';
declare class Encryptor extends CTRGladman {
    processBlock(words: any, offset: any): void;
    _counter: any[];
}
export {};
