/**
 * Counter block mode.
 */
export class CTR extends BlockCipherMode {
}
export namespace CTR {
    export { Encryptor };
    import Decryptor = Encryptor;
    export { Decryptor };
}
import { BlockCipherMode } from './cipher-core.js';
declare class Encryptor extends CTR {
    processBlock(words: any, offset: any): void;
    _counter: any[];
}
export {};
