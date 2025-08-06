import {
  Base,
  WordArray,
  Hex,
  Latin1,
  Utf8,
  BufferedBlockAlgorithm,
  Hasher,
  HMAC,
} from './core.ts';
import {
  X64Word,
  X64WordArray,
} from './x64-core.ts';
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
} from './cipher-core.ts';

import { Utf16, Utf16BE, Utf16LE } from './enc-utf16.ts';
import { Base64 } from './enc-base64.ts';
import { Base64url } from './enc-base64url.ts';
import { HMAC as HMACExport } from './hmac.ts';
import { MD5Algo, MD5, HmacMD5 } from './md5.ts';
import { SHA1Algo, SHA1, HmacSHA1 } from './sha1.ts';
import { SHA224Algo, SHA224, HmacSHA224 } from './sha224.ts';
import { SHA256Algo, SHA256, HmacSHA256 } from './sha256.ts';
import { SHA384Algo, SHA384, HmacSHA384 } from './sha384.ts';
import { SHA512Algo, SHA512, HmacSHA512 } from './sha512.ts';
import { SHA3Algo, SHA3, HmacSHA3 } from './sha3.ts';
import { RIPEMD160Algo, RIPEMD160, HmacRIPEMD160 } from './ripemd160.ts';
import { PBKDF2Algo, PBKDF2 } from './pbkdf2.ts';
import { EvpKDFAlgo, EvpKDF } from './evpkdf.ts';
import { AESAlgo, AES } from './aes.ts';
import {
  DESAlgo,
  DES,
  TripleDESAlgo,
  TripleDES,
} from './tripledes.ts';
import { RabbitAlgo, Rabbit } from './rabbit.ts';
import { RabbitLegacyAlgo, RabbitLegacy } from './rabbit-legacy.ts';
import {
  RC4Algo,
  RC4,
  RC4DropAlgo,
  RC4Drop,
} from './rc4.ts';
import { BlowfishAlgo, Blowfish } from './blowfish.ts';
import { CFB } from './mode-cfb.ts';
import { CTR } from './mode-ctr.ts';
import { CTRGladman } from './mode-ctr-gladman.ts';
import { ECB } from './mode-ecb.ts';
import { OFB } from './mode-ofb.ts';
import { AnsiX923 } from './pad-ansix923.ts';
import { Iso10126 } from './pad-iso10126.ts';
import { Iso97971 } from './pad-iso97971.ts';
import { NoPadding } from './pad-nopadding.ts';
import { ZeroPadding } from './pad-zeropadding.ts';
import { HexFormatter } from './format-hex.ts';

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
    Base64url,
  },

  algo: {
    HMAC,
    MD5: MD5Algo,
    SHA1: SHA1Algo,
    SHA224: SHA224Algo,
    SHA256: SHA256Algo,
    SHA384: SHA384Algo,
    SHA512: SHA512Algo,
    SHA3: SHA3Algo,
    RIPEMD160: RIPEMD160Algo,

    PBKDF2: PBKDF2Algo,
    EvpKDF: EvpKDFAlgo,

    AES: AESAlgo,
    DES: DESAlgo,
    TripleDES: TripleDESAlgo,
    Rabbit: RabbitAlgo,
    RabbitLegacy: RabbitLegacyAlgo,
    RC4: RC4Algo,
    RC4Drop: RC4DropAlgo,
    Blowfish: BlowfishAlgo,
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
    Hex: HexFormatter,
  },

  kdf: {
    OpenSSL: OpenSSLKdf,
  },

  MD5,
  HmacMD5,
  SHA1,
  HmacSHA1,
  SHA224,
  HmacSHA224,
  SHA256,
  HmacSHA256,
  SHA384,
  HmacSHA384,
  SHA512,
  HmacSHA512,
  SHA3,
  HmacSHA3,
  RIPEMD160,
  HmacRIPEMD160,

  PBKDF2,
  EvpKDF,

  AES,
  DES,
  TripleDES,
  Rabbit,
  RabbitLegacy,
  RC4,
  RC4Drop,
  Blowfish,
};

// Named exports for better tree-shaking
export {
  Base,
  WordArray,
  Hex,
  Latin1,
  Utf8,
  BufferedBlockAlgorithm,
  Hasher,
  HMAC,
  X64Word,
  X64WordArray,
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
  Utf16,
  Utf16BE,
  Utf16LE,
  Base64,
  Base64url,
  MD5Algo,
  MD5,
  HmacMD5,
  SHA1Algo,
  SHA1,
  HmacSHA1,
  SHA224Algo,
  SHA224,
  HmacSHA224,
  SHA256Algo,
  SHA256,
  HmacSHA256,
  SHA384Algo,
  SHA384,
  HmacSHA384,
  SHA512Algo,
  SHA512,
  HmacSHA512,
  SHA3Algo,
  SHA3,
  HmacSHA3,
  RIPEMD160Algo,
  RIPEMD160,
  HmacRIPEMD160,
  PBKDF2Algo,
  PBKDF2,
  EvpKDFAlgo,
  EvpKDF,
  AESAlgo,
  AES,
  DESAlgo,
  DES,
  TripleDESAlgo,
  TripleDES,
  RabbitAlgo,
  Rabbit,
  RabbitLegacyAlgo,
  RabbitLegacy,
  RC4Algo,
  RC4,
  RC4DropAlgo,
  RC4Drop,
  BlowfishAlgo,
  Blowfish,
  CFB,
  CTR,
  CTRGladman,
  ECB,
  OFB,
  AnsiX923,
  Iso10126,
  Iso97971,
  NoPadding,
  ZeroPadding,
  HexFormatter,
};