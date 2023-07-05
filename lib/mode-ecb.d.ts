/**
 * Electronic Codebook block mode.
 */
export class ECB extends BlockCipherMode {
}
export namespace ECB {
    export { Encryptor };
    export { Decryptor };
}
import { BlockCipherMode } from './cipher-core.js';
declare class Encryptor extends ECB {
    processBlock(words: any, offset: any): void;
}
declare class Decryptor extends ECB {
    processBlock(words: any, offset: any): void;
}
export {};
