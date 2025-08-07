import {
  Base,
  WordArray,
  Hex,
  Latin1,
  Utf8,
  BufferedBlockAlgorithm,
  Hasher,
  HMAC,
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
import { Base64url } from './enc-base64url';
import { HMAC as HMACExport } from './hmac';
import { MD5Algo, MD5, HmacMD5 } from './md5';
import { SHA1Algo, SHA1, HmacSHA1 } from './sha1';
import { SHA224Algo, SHA224, HmacSHA224 } from './sha224';
import { SHA256Algo, SHA256, HmacSHA256 } from './sha256';
import { SHA384Algo, SHA384, HmacSHA384 } from './sha384';
import { SHA512Algo, SHA512, HmacSHA512 } from './sha512';
import { SHA3Algo, SHA3, HmacSHA3 } from './sha3';
import { RIPEMD160Algo, RIPEMD160, HmacRIPEMD160 } from './ripemd160';
import { PBKDF2Algo, PBKDF2 } from './pbkdf2';
import { EvpKDFAlgo, EvpKDF } from './evpkdf';
import { AESAlgo, AES } from './aes';
import {
  DESAlgo,
  DES,
  TripleDESAlgo,
  TripleDES,
} from './tripledes';
import { RabbitAlgo, Rabbit } from './rabbit';
import { RabbitLegacyAlgo, RabbitLegacy } from './rabbit-legacy';
import {
  RC4Algo,
  RC4,
  RC4DropAlgo,
  RC4Drop,
} from './rc4';
import { BlowfishAlgo, Blowfish } from './blowfish';
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
import { HexFormatter } from './format-hex';

interface CryptoES {
  lib: {
    Base: typeof Base;
    WordArray: typeof WordArray;
    BufferedBlockAlgorithm: typeof BufferedBlockAlgorithm;
    Hasher: typeof Hasher;
    Cipher: typeof Cipher;
    StreamCipher: typeof StreamCipher;
    BlockCipherMode: typeof BlockCipherMode;
    BlockCipher: typeof BlockCipher;
    CipherParams: typeof CipherParams;
    SerializableCipher: typeof SerializableCipher;
    PasswordBasedCipher: typeof PasswordBasedCipher;
  };
  x64: {
    Word: typeof X64Word;
    WordArray: typeof X64WordArray;
  };
  enc: {
    Hex: typeof Hex;
    Latin1: typeof Latin1;
    Utf8: typeof Utf8;
    Utf16: typeof Utf16;
    Utf16BE: typeof Utf16BE;
    Utf16LE: typeof Utf16LE;
    Base64: typeof Base64;
    Base64url: typeof Base64url;
  };
  algo: {
    HMAC: typeof HMAC;
    MD5: typeof MD5Algo;
    SHA1: typeof SHA1Algo;
    SHA224: typeof SHA224Algo;
    SHA256: typeof SHA256Algo;
    SHA384: typeof SHA384Algo;
    SHA512: typeof SHA512Algo;
    SHA3: typeof SHA3Algo;
    RIPEMD160: typeof RIPEMD160Algo;
    PBKDF2: typeof PBKDF2Algo;
    EvpKDF: typeof EvpKDFAlgo;
    AES: typeof AESAlgo;
    DES: typeof DESAlgo;
    TripleDES: typeof TripleDESAlgo;
    Rabbit: typeof RabbitAlgo;
    RabbitLegacy: typeof RabbitLegacyAlgo;
    RC4: typeof RC4Algo;
    RC4Drop: typeof RC4DropAlgo;
    Blowfish: typeof BlowfishAlgo;
  };
  mode: {
    CBC: typeof CBC;
    CFB: typeof CFB;
    CTR: typeof CTR;
    CTRGladman: typeof CTRGladman;
    ECB: typeof ECB;
    OFB: typeof OFB;
  };
  pad: {
    Pkcs7: typeof Pkcs7;
    AnsiX923: typeof AnsiX923;
    Iso10126: typeof Iso10126;
    Iso97971: typeof Iso97971;
    NoPadding: typeof NoPadding;
    ZeroPadding: typeof ZeroPadding;
  };
  format: {
    OpenSSL: typeof OpenSSLFormatter;
    Hex: typeof HexFormatter;
  };
  kdf: {
    OpenSSL: typeof OpenSSLKdf;
  };
  MD5: typeof MD5;
  HmacMD5: typeof HmacMD5;
  SHA1: typeof SHA1;
  HmacSHA1: typeof HmacSHA1;
  SHA224: typeof SHA224;
  HmacSHA224: typeof HmacSHA224;
  SHA256: typeof SHA256;
  HmacSHA256: typeof HmacSHA256;
  SHA384: typeof SHA384;
  HmacSHA384: typeof HmacSHA384;
  SHA512: typeof SHA512;
  HmacSHA512: typeof HmacSHA512;
  SHA3: typeof SHA3;
  HmacSHA3: typeof HmacSHA3;
  RIPEMD160: typeof RIPEMD160;
  HmacRIPEMD160: typeof HmacRIPEMD160;
  PBKDF2: typeof PBKDF2;
  EvpKDF: typeof EvpKDF;
  AES: typeof AES;
  DES: typeof DES;
  TripleDES: typeof TripleDES;
  Rabbit: typeof Rabbit;
  RabbitLegacy: typeof RabbitLegacy;
  RC4: typeof RC4;
  RC4Drop: typeof RC4Drop;
  Blowfish: typeof Blowfish;
}

const CryptoES: CryptoES = {
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

export default CryptoES;
export type { CryptoES };

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