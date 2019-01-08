import {
  Base,
  WordArray,
  Hex,
  Latin1,
  Utf8,
  BufferedBlockAlgorithm,
  Hasher,
} from './core';
import {
  X64Word,
  X64WordArray,
} from './x64-core';
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
} from './cipher-core';

import { Utf16, Utf16BE, Utf16LE } from './enc-utf16';
import { Base64 } from './enc-base64';
import { HMAC } from './hmac';
import { MD5, MD5Func, HmacMD5Func } from './md5';
import { SHA1, SHA1Func, HmacSHA1Func } from './sha1';
import { SHA224, SHA224Func, HmacSHA224Func } from './sha224';
import { SHA256, SHA256Func, HmacSHA256Func } from './sha256';
import { SHA384, SHA384Func, HmacSHA384Func } from './sha384';
import { SHA512, SHA512Func, HmacSHA512Func } from './sha512';
import { SHA3, SHA3Func, HmacSHA3Func } from './sha3';
import { PBKDF2, PBKDF2Func } from './pbkdf2';
import { EvpKDF, EvpKDFFunc } from './evpkdf';
import { AES, AESFunc } from './aes';
import {
  DES,
  DESFunc,
  TripleDES,
  TripleDESFunc,
} from './tripledes';
import { Rabbit, RabbitFunc } from './rabbit';
import { RabbitLegacy, RabbitLegacyFunc } from './rabbit-legacy';
import {
  RC4,
  RC4Func,
  RC4Drop,
  RC4DropFunc,
} from './rc4';
import { CFB } from './mode-cfb';
import { CTR } from './mode-ctr';
import { CTRGladman } from './mode-ctr-gladman';
import { ECB } from './mode-ecb';
import { OFB } from './mode-ofb';
import { AnsiX923 } from './pad-ansix923';
import { Iso10126 } from './pad-iso10126';
import { Iso97971 } from './pad-iso97971';
import { NoPadding } from './pad-nopadding';
import { ZeroPadding } from './pad-zeropadding';

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
