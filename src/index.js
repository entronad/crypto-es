import {
  Base,
  WordArray,
  Hex,
  Latin1,
  Utf8,
  BufferedBlockAlgorithm,
  Hasher,
} from './core.js';
import {
  X64Word,
  X64WordArray,
} from './x64-core.js';
import {
  Cipher,
  StreamCipher,
  BlockCipherMode,
  CBC,
  Pkcs7,
  BlockCipher,
  CipherParams,
  OpenSSLFormatter,
  SerializableCipher,
  OpenSSLKdf,
  PasswordBasedCipher,
} from './cipher-core.js';

import { Utf16, Utf16BE, Utf16LE } from './enc-utf16.js';
import { Base64 } from './enc-base64.js';
import { HMAC } from './hmac.js';
import { MD5, MD5Func, HmacMD5Func } from './md5.js';
import { SHA1, SHA1Func, HmacSHA1Func } from './sha1.js';
import { SHA224, SHA224Func, HmacSHA224Func } from './sha224.js';
import { SHA256, SHA256Func, HmacSHA256Func } from './sha256.js';
import { SHA384, SHA384Func, HmacSHA384Func } from './sha384.js';
import { SHA512, SHA512Func, HmacSHA512Func } from './sha512.js';
import { SHA3, SHA3Func, HmacSHA3Func } from './sha3.js';
import { PBKDF2, PBKDF2Func } from './pbkdf2.js';
import { EvpKDF, EvpKDFFunc } from './evpkdf.js';
import { AES, AESFunc } from './aes.js';
import {
  DES,
  DESFunc,
  TripleDES,
  TripleDESFunc,
} from './tripledes.js';
import { Rabbit, RabbitFunc } from './rabbit.js';
import { RabbitLegacy, RabbitLegacyFunc } from './rabbit-legacy.js';
import {
  RC4,
  RC4Func,
  RC4Drop,
  RC4DropFunc,
} from './rc4.js';
import { CFB } from './mode-cfb.js';
import { CTR } from './mode-ctr.js';
import { CTRGladman } from './mode-ctr-gladman.js';
import { ECB } from './mode-ecb.js';
import { OFB } from './mode-ofb.js';
import { AnsiX923 } from './pad-ansix923.js';
import { Iso10126 } from './pad-iso10126.js';
import { Iso97971 } from './pad-iso97971.js';
import { NoPadding } from './pad-nopadding.js';
import { ZeroPadding } from './pad-zeropadding.js';

export default {
  lib: {
    Base,
    WordArray,
    BufferedBlockAlgorithm,
    Hasher,
    Cipher,
    StreamCipher,
    BlockCipherMode,
    BlockCipher,
    CipherParams,
    SerializableCipher,
    PasswordBasedCipher,
  },

  x64: {
    Word: X64Word,
    WordArray: X64WordArray,
  },

  enc: {
    Hex,
    Latin1,
    Utf8,
    Utf16,
    Utf16BE,
    Utf16LE,
    Base64,
  },

  algo: {
    HMAC,
    MD5,
    SHA1,
    SHA224,
    SHA256,
    SHA384,
    SHA512,
    SHA3,

    PBKDF2,
    EvpKDF,

    AES,
    DES,
    TripleDES,
    Rabbit,
    RabbitLegacy,
    RC4,
    RC4Drop,
  },

  mode: {
    CBC,
    CFB,
    CTR,
    CTRGladman,
    ECB,
    OFB,
  },

  pad: {
    Pkcs7,
    AnsiX923,
    Iso10126,
    Iso97971,
    NoPadding,
    ZeroPadding,
  },

  format: {
    OpenSSL: OpenSSLFormatter,
  },

  kdf: {
    OpenSSL: OpenSSLKdf,
  },

  MD5: MD5Func,
  HmacMD5: HmacMD5Func,
  SHA1: SHA1Func,
  HmacSHA1: HmacSHA1Func,
  SHA224: SHA224Func,
  HmacSHA224: HmacSHA224Func,
  SHA256: SHA256Func,
  HmacSHA256: HmacSHA256Func,
  SHA384: SHA384Func,
  HmacSHA384: HmacSHA384Func,
  SHA512: SHA512Func,
  HmacSHA512: HmacSHA512Func,
  SHA3: SHA3Func,
  HmacSHA3: HmacSHA3Func,

  PBKDF2: PBKDF2Func,
  EvpKDF: EvpKDFFunc,

  AES: AESFunc,
  DES: DESFunc,
  TripleDES: TripleDESFunc,
  Rabbit: RabbitFunc,
  RabbitLegacy: RabbitLegacyFunc,
  RC4: RC4Func,
  RC4Drop: RC4DropFunc,
};
