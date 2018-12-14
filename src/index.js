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
  Utf16,
  Utf16BE,
  Utf16LE,
} from './enc-utf16';

import {
  Base64,
} from './enc-base64';

import {
  MD5,
  HmacMD5,
} from './md5';

import {
  SHA1,
  HmacSHA1,
} from './sha1';

import {
  SHA224,
  HmacSHA224,
} from './sha224';

import {
  SHA256,
  HmacSHA256,
} from './sha256';

import {
  SHA384,
  HmacSHA384,
} from './sha384';

import {
  SHA512,
  HmacSHA512,
} from './sha512';

import {
  SHA3,
  HmacSHA3,
} from './sha3';

export default {
  lib: {
    Base,
    WordArray,
    BufferedBlockAlgorithm,
    Hasher,
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
  },
};
