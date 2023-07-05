/**
 * Cipher Feedback block mode.
 */
export class CFB extends BlockCipherMode {
}
export namespace CFB {
    export { Encryptor };
    export { Decryptor };
}
import { BlockCipherMode } from './cipher-core.js';
declare class Encryptor extends CFB {
    processBlock(words: any, offset: any): void;
    _prevBlock: any;
}
declare class Decryptor extends CFB {
    processBlock(words: any, offset: any): void;
    _prevBlock: any;
}
export {};
