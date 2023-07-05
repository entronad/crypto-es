/**
 * Output Feedback block mode.
 */
export class OFB extends BlockCipherMode {
}
export namespace OFB {
    export { Encryptor };
    import Decryptor = Encryptor;
    export { Decryptor };
}
import { BlockCipherMode } from './cipher-core.js';
declare class Encryptor extends OFB {
    processBlock(words: any, offset: any): void;
    _keystream: any[];
}
export {};
