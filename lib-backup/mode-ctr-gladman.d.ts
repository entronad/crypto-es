import {
  BlockCipherMode,
} from './cipher-core';

/** @preserve
 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
 * derived from CryptoJS.mode.CTR
 * Jan Hruby jhruby.web@gmail.com
 */
export class CTRGladman extends BlockCipherMode {}
