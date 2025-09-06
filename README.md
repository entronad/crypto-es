<p align="center">
<img src="https://raw.githubusercontent.com/entronad/crypto-es/next/devdoc/logo.png" />
</p>
<p align="center">

[![npm version](https://img.shields.io/npm/v/crypto-es.svg)](https://www.npmjs.com/package/crypto-es) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A modern JavaScript/TypeScript cryptography library offering a comprehensive collection of hash functions, ciphers, encoders, and key derivation functions. Pure TypeScript implementation with full ES6 module support and CommonJS compatibility.

## ✨ Features

- 🚀 **Modern Implementation** - Pure TypeScript with full type definitions
- 📦 **Dual Module Support** - ESM and CommonJS outputs for maximum compatibility
- 🌳 **Tree-Shakeable** - Import only what you need for optimal bundle size
- 🔄 **Streaming API** - Process large data efficiently with progressive hashing/encryption
- 🔐 **Comprehensive Algorithms** - Hash functions, symmetric ciphers, KDFs, and more
- 💪 **Zero Dependencies** - No external dependencies for lightweight integration
- ⚡ **High Performance** - Optimized implementations with streaming support
- 🛡️ **Battle-Tested** - Extensive test suite with known test vectors

## 📦 Installation

```bash
# Using npm
npm install crypto-es

# Using yarn
yarn add crypto-es

# Using pnpm
pnpm add crypto-es
```

## 🚀 Quick Start

### Basic Hashing

```typescript
import { MD5, SHA256, SHA512 } from 'crypto-es';

// Simple hashing
const hash1 = MD5('Hello World').toString();
// d41d8cd98f00b204e9800998ecf8427e

const hash2 = SHA256('Hello World').toString();
// a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b3f8b4c5cdcdcd9d0

const hash3 = SHA512('Hello World').toString();
// 2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b
```

### Basic Encryption

```typescript
import { AES, DES, TripleDES } from 'crypto-es';

// AES encryption
const encrypted = AES.encrypt('Secret Message', 'secret key').toString();
const decrypted = AES.decrypt(encrypted, 'secret key').toString();

// DES encryption
const desEncrypted = DES.encrypt('Secret Message', 'secret key').toString();
const desDecrypted = DES.decrypt(desEncrypted, 'secret key').toString();
```

### Encoding/Decoding

```typescript
import { Base64, Hex, UTF8 } from 'crypto-es';

// Base64 encoding
const base64 = Base64.stringify(UTF8.parse('Hello World'));
// SGVsbG8gV29ybGQ=

// Hex encoding
const hex = Hex.stringify(UTF8.parse('Hello World'));
// 48656c6c6f20576f726c64
```

## 📚 Complete Algorithm Reference

### Hash Functions

| Algorithm | Description | Output Size | Usage |
|-----------|-------------|-------------|--------|
| [MD5](#md5) | Legacy hash function | 128 bits | Legacy compatibility only |
| [SHA1](#sha1) | SHA-1 hash function | 160 bits | Legacy systems |
| [SHA224](#sha224) | SHA-2 family | 224 bits | Moderate security |
| [SHA256](#sha256) | SHA-2 family | 256 bits | **Recommended** |
| [SHA384](#sha384) | SHA-2 family | 384 bits | High security |
| [SHA512](#sha512) | SHA-2 family | 512 bits | Maximum security |
| [SHA3](#sha3) | Latest SHA-3 standard | 224-512 bits | Modern applications |
| [RIPEMD160](#ripemd160) | RIPEMD family | 160 bits | Specialized use |

### Symmetric Ciphers

| Algorithm | Key Size | Block Size | Description |
|-----------|----------|------------|-------------|
| [AES](#aes) | 128/192/256 bits | 128 bits | **Industry standard** |
| [DES](#des) | 56 bits | 64 bits | Legacy only |
| [TripleDES](#tripledes) | 168 bits | 64 bits | Legacy upgrade from DES |
| [Rabbit](#rabbit) | 128 bits | Stream | High-performance stream cipher |
| [RC4](#rc4) | Variable | Stream | Legacy stream cipher |
| [Blowfish](#blowfish) | 32-448 bits | 64 bits | Variable key length |

### Key Derivation Functions

| Algorithm | Description | Usage |
|-----------|-------------|--------|
| [PBKDF2](#pbkdf2) | Password-Based KDF v2 | **Recommended for passwords** |
| [EvpKDF](#evpkdf) | OpenSSL EVP KDF | OpenSSL compatibility |

### Encoders

| Encoder | Description |
|---------|-------------|
| [Base64](#base64) | Standard Base64 encoding |
| [Base64url](#base64url) | URL-safe Base64 encoding |
| [Hex](#hex) | Hexadecimal encoding |
| [UTF8](#utf8) | UTF-8 text encoding |
| [UTF16](#utf16) | UTF-16 text encoding |
| [Latin1](#latin1) | Latin-1 text encoding |

### Cipher Modes

| Mode | Description | IV Required |
|------|-------------|-------------|
| [CBC](#cbc) | Cipher Block Chaining (default) | Yes |
| [ECB](#ecb) | Electronic Codebook | No |
| [CFB](#cfb) | Cipher Feedback | Yes |
| [OFB](#ofb) | Output Feedback | Yes |
| [CTR](#ctr) | Counter | Yes |

### Padding Schemes

| Padding | Description |
|---------|-------------|
| [PKCS7](#pkcs7) | PKCS#7 padding (default) |
| [AnsiX923](#ansix923) | ANSI X9.23 padding |
| [ISO10126](#iso10126) | ISO 10126 padding |
| [ISO97971](#iso97971) | ISO/IEC 9797-1 padding |
| [ZeroPadding](#zeropadding) | Zero byte padding |
| [NoPadding](#nopadding) | No padding |

## 📖 Detailed Usage Guide

### Hash Algorithms

#### MD5

```typescript
import { MD5, HmacMD5 } from 'crypto-es';

// Basic hashing
const hash = MD5('message').toString();

// HMAC-MD5
const hmac = HmacMD5('message', 'secret key').toString();

// Progressive hashing
const hasher = MD5Algo.create();
hasher.update('message part 1');
hasher.update('message part 2');
const progressiveHash = hasher.finalize().toString();
```

#### SHA1

```typescript
import { SHA1, HmacSHA1, SHA1Algo } from 'crypto-es';

// Basic hashing
const hash = SHA1('message').toString();

// HMAC-SHA1
const hmac = HmacSHA1('message', 'secret key').toString();

// Progressive hashing
const hasher = SHA1Algo.create();
hasher.update('large data chunk 1');
hasher.update('large data chunk 2');
const result = hasher.finalize().toString();
```

#### SHA224

```typescript
import { SHA224, HmacSHA224 } from 'crypto-es';

// Basic hashing
const hash = SHA224('message').toString();

// HMAC-SHA224
const hmac = HmacSHA224('message', 'secret key').toString();
```

#### SHA256

```typescript
import { SHA256, HmacSHA256, SHA256Algo } from 'crypto-es';

// Basic hashing
const hash = SHA256('message').toString();

// HMAC-SHA256 (commonly used for API authentication)
const hmac = HmacSHA256('message', 'secret key').toString();

// Progressive hashing for large files
const hasher = SHA256Algo.create();
hasher.update('chunk1');
hasher.update('chunk2');
hasher.update('chunk3');
const fileHash = hasher.finalize().toString();

// Different output formats
import { Hex, Base64 } from 'crypto-es';
const hashHex = SHA256('message').toString(Hex);
const hashBase64 = SHA256('message').toString(Base64);
```

#### SHA384

```typescript
import { SHA384, HmacSHA384 } from 'crypto-es';

// Basic hashing
const hash = SHA384('message').toString();

// HMAC-SHA384
const hmac = HmacSHA384('message', 'secret key').toString();
```

#### SHA512

```typescript
import { SHA512, HmacSHA512, SHA512Algo } from 'crypto-es';

// Basic hashing
const hash = SHA512('message').toString();

// HMAC-SHA512
const hmac = HmacSHA512('message', 'secret key').toString();

// Progressive hashing with typed arrays
import { WordArray } from 'crypto-es';
const hasher = SHA512Algo.create();
const data1 = WordArray.create(new Uint8Array([1, 2, 3, 4]));
const data2 = WordArray.create(new Uint8Array([5, 6, 7, 8]));
hasher.update(data1);
hasher.update(data2);
const result = hasher.finalize();
```

#### SHA3

```typescript
import { SHA3 } from 'crypto-es';

// SHA3-256 (default)
const hash256 = SHA3('message').toString();

// SHA3-224
const hash224 = SHA3('message', { outputLength: 224 }).toString();

// SHA3-384
const hash384 = SHA3('message', { outputLength: 384 }).toString();

// SHA3-512
const hash512 = SHA3('message', { outputLength: 512 }).toString();
```

#### RIPEMD160

```typescript
import { RIPEMD160, HmacRIPEMD160 } from 'crypto-es';

// Basic hashing
const hash = RIPEMD160('message').toString();

// HMAC-RIPEMD160
const hmac = HmacRIPEMD160('message', 'secret key').toString();
```

### Symmetric Encryption

#### AES

```typescript
import { AES, ECB, CBC, CFB, OFB, CTR, NoPadding, PKCS7 } from 'crypto-es';

// Simple encryption with password
const encrypted = AES.encrypt('Secret Message', 'password').toString();
const decrypted = AES.decrypt(encrypted, 'password').toString(UTF8);

// AES with specific key size (128/192/256 bits)
import { PBKDF2, WordArray } from 'crypto-es';
const key128 = PBKDF2('password', 'salt', { keySize: 128/32 });
const key192 = PBKDF2('password', 'salt', { keySize: 192/32 });
const key256 = PBKDF2('password', 'salt', { keySize: 256/32 });

// Encryption with different modes
const encrypted1 = AES.encrypt('message', key256, { mode: ECB }).toString();
const encrypted2 = AES.encrypt('message', key256, { mode: CBC }).toString();
const encrypted3 = AES.encrypt('message', key256, { mode: CFB }).toString();
const encrypted4 = AES.encrypt('message', key256, { mode: OFB }).toString();
const encrypted5 = AES.encrypt('message', key256, { mode: CTR }).toString();

// Custom IV (Initialization Vector)
const iv = WordArray.random(128/8);
const encrypted = AES.encrypt('message', key256, { iv: iv }).toString();

// Different padding schemes
const encrypted6 = AES.encrypt('message', key256, { padding: PKCS7 }).toString();
const encrypted7 = AES.encrypt('message', key256, { padding: NoPadding }).toString();

// Streaming encryption for large data
import { AESAlgo } from 'crypto-es';
const key = PBKDF2('password', 'salt', { keySize: 256/32 });
const iv = WordArray.random(128/8);
const aes = AESAlgo.createEncryptor(key, { iv: iv });

const part1 = aes.process('part 1 of data');
const part2 = aes.process('part 2 of data');
const part3 = aes.process('part 3 of data');
const encrypted = part1.concat(part2).concat(part3).concat(aes.finalize());
```

#### DES

```typescript
import { DES, DESAlgo } from 'crypto-es';

// Simple DES encryption
const encrypted = DES.encrypt('Message', 'password').toString();
const decrypted = DES.decrypt(encrypted, 'password').toString(UTF8);

// DES with custom options
import { ECB, NoPadding } from 'crypto-es';
const encrypted = DES.encrypt('Message', 'password', {
  mode: ECB,
  padding: NoPadding
}).toString();

// Streaming DES
const des = DESAlgo.createEncryptor('password');
const encrypted = des.finalize('Message').toString();
```

#### TripleDES

```typescript
import { TripleDES, TripleDESAlgo } from 'crypto-es';

// Simple 3DES encryption
const encrypted = TripleDES.encrypt('Message', 'password').toString();
const decrypted = TripleDES.decrypt(encrypted, 'password').toString(UTF8);

// 3DES with 192-bit key
import { PBKDF2 } from 'crypto-es';
const key = PBKDF2('password', 'salt', { keySize: 192/32 });
const encrypted = TripleDES.encrypt('Message', key).toString();

// Streaming 3DES
const cipher = TripleDESAlgo.createEncryptor(key);
const encrypted = cipher.finalize('Message').toString();
```

#### Rabbit

```typescript
import { Rabbit, RabbitAlgo } from 'crypto-es';

// Simple Rabbit encryption
const encrypted = Rabbit.encrypt('Message', 'password').toString();
const decrypted = Rabbit.decrypt(encrypted, 'password').toString(UTF8);

// Rabbit with IV
import { WordArray } from 'crypto-es';
const key = WordArray.random(128/8);
const iv = WordArray.random(64/8);
const encrypted = Rabbit.encrypt('Message', key, { iv: iv }).toString();

// Streaming Rabbit
const cipher = RabbitAlgo.createEncryptor(key, { iv: iv });
const encrypted = cipher.finalize('Message').toString();
```

#### RC4

```typescript
import { RC4, RC4Drop } from 'crypto-es';

// Simple RC4 encryption
const encrypted = RC4.encrypt('Message', 'password').toString();
const decrypted = RC4.decrypt(encrypted, 'password').toString(UTF8);

// RC4Drop (more secure variant)
const encrypted = RC4Drop.encrypt('Message', 'password').toString();
const decrypted = RC4Drop.decrypt(encrypted, 'password').toString(UTF8);

// RC4 with custom drop value
import { RC4DropAlgo } from 'crypto-es';
const cipher = RC4DropAlgo.createEncryptor('password', { drop: 3072/4 });
const encrypted = cipher.finalize('Message').toString();
```

#### Blowfish

```typescript
import { Blowfish, BlowfishAlgo } from 'crypto-es';

// Simple Blowfish encryption
const encrypted = Blowfish.encrypt('Message', 'password').toString();
const decrypted = Blowfish.decrypt(encrypted, 'password').toString(UTF8);

// Blowfish with variable key length (32-448 bits)
import { PBKDF2 } from 'crypto-es';
const key128 = PBKDF2('password', 'salt', { keySize: 128/32 });
const key256 = PBKDF2('password', 'salt', { keySize: 256/32 });
const key448 = PBKDF2('password', 'salt', { keySize: 448/32 });

const encrypted1 = Blowfish.encrypt('Message', key128).toString();
const encrypted2 = Blowfish.encrypt('Message', key256).toString();
const encrypted3 = Blowfish.encrypt('Message', key448).toString();
```

### Key Derivation Functions

#### PBKDF2

```typescript
import { PBKDF2, SHA256Algo, SHA512Algo } from 'crypto-es';

// Basic PBKDF2 with default settings (SHA1, 1 iteration)
const key = PBKDF2('password', 'salt');

// PBKDF2 with custom settings
const key256 = PBKDF2('password', 'salt', {
  keySize: 256/32,        // 256-bit key
  iterations: 10000,      // 10,000 iterations
  hasher: SHA256Algo     // SHA256 hasher
});

const key512 = PBKDF2('password', 'salt', {
  keySize: 512/32,        // 512-bit key
  iterations: 100000,     // 100,000 iterations
  hasher: SHA512Algo     // SHA512 hasher
});

// Use for AES encryption
import { AES } from 'crypto-es';
const derivedKey = PBKDF2('mypassword', 'mysalt', {
  keySize: 256/32,
  iterations: 10000
});
const encrypted = AES.encrypt('Secret', derivedKey).toString();
```

#### EvpKDF

```typescript
import { EvpKDF, MD5Algo, SHA256Algo } from 'crypto-es';

// Basic EvpKDF
const key = EvpKDF('password', 'salt');

// EvpKDF with custom settings
const key256 = EvpKDF('password', 'salt', {
  keySize: 256/32,
  iterations: 1000,
  hasher: SHA256Algo
});

// Compatible with OpenSSL EVP_BytesToKey
const opensslKey = EvpKDF('password', 'salt', {
  keySize: 256/32,
  ivSize: 128/32,
  hasher: MD5Algo
});
```

### Encoders

#### Base64

```typescript
import { Base64, UTF8, WordArray } from 'crypto-es';

// Encode string to Base64
const encoded = Base64.stringify(UTF8.parse('Hello World'));
// SGVsbG8gV29ybGQ=

// Decode Base64 to string
const decoded = UTF8.stringify(Base64.parse('SGVsbG8gV29ybGQ='));
// Hello World

// Base64 with WordArray
const wordArray = WordArray.create([0x48656c6c, 0x6f20576f, 0x726c6400], 11);
const base64 = Base64.stringify(wordArray);
```

#### Base64url

```typescript
import { Base64url, UTF8 } from 'crypto-es';

// URL-safe Base64 encoding (no padding, - and _ instead of + and /)
const encoded = Base64url.stringify(UTF8.parse('Hello World??'));
// SGVsbG8gV29ybGQ_Pw

// Decode Base64url
const decoded = UTF8.stringify(Base64url.parse('SGVsbG8gV29ybGQ_Pw'));
// Hello World??
```

#### Hex

```typescript
import { Hex, UTF8, WordArray } from 'crypto-es';

// Encode string to Hex
const encoded = Hex.stringify(UTF8.parse('Hello World'));
// 48656c6c6f20576f726c64

// Decode Hex to string
const decoded = UTF8.stringify(Hex.parse('48656c6c6f20576f726c64'));
// Hello World

// Hex with WordArray
const wordArray = WordArray.create([0x48656c6c, 0x6f20576f, 0x726c6400], 11);
const hex = Hex.stringify(wordArray);
// 48656c6c6f20576f726c64
```

#### UTF8

```typescript
import { UTF8, WordArray } from 'crypto-es';

// Parse UTF8 string to WordArray
const wordArray = UTF8.parse('Hello World 你好世界');

// Stringify WordArray to UTF8
const utf8String = UTF8.stringify(wordArray);

// Handle special characters
const emoji = UTF8.parse('😀🎉🚀');
const back = UTF8.stringify(emoji);
```

#### UTF16

```typescript
import { UTF16, UTF16BE, UTF16LE } from 'crypto-es';

// UTF16 Big Endian
const encodedBE = UTF16BE.stringify(UTF16BE.parse('Hello'));

// UTF16 Little Endian
const encodedLE = UTF16LE.stringify(UTF16LE.parse('Hello'));

// Auto-detect endianness
const encoded = UTF16.stringify(UTF16.parse('Hello'));
```

#### Latin1

```typescript
import { Latin1 } from 'crypto-es';

// Parse Latin1 string to WordArray
const wordArray = Latin1.parse('Hello World');

// Stringify WordArray to Latin1
const latin1String = Latin1.stringify(wordArray);
```

### Cipher Modes

#### CBC

```typescript
import { AES, CBC, PKCS7 } from 'crypto-es';

// CBC mode (default)
const encrypted = AES.encrypt('message', 'password', {
  mode: CBC,
  padding: PKCS7
}).toString();
```

#### ECB

```typescript
import { AES, ECB } from 'crypto-es';

// ECB mode (not recommended for security)
const encrypted = AES.encrypt('message', 'password', {
  mode: ECB
}).toString();
```

#### CFB

```typescript
import { AES, CFB } from 'crypto-es';

// CFB mode
const encrypted = AES.encrypt('message', 'password', {
  mode: CFB
}).toString();
```

#### OFB

```typescript
import { AES, OFB } from 'crypto-es';

// OFB mode
const encrypted = AES.encrypt('message', 'password', {
  mode: OFB
}).toString();
```

#### CTR

```typescript
import { AES, CTR } from 'crypto-es';

// CTR mode
const encrypted = AES.encrypt('message', 'password', {
  mode: CTR
}).toString();
```

### Padding Schemes

#### PKCS7

```typescript
import { AES, PKCS7 } from 'crypto-es';

// PKCS7 padding (default)
const encrypted = AES.encrypt('message', 'password', {
  padding: PKCS7
}).toString();
```

#### AnsiX923

```typescript
import { AES, AnsiX923 } from 'crypto-es';

// ANSI X9.23 padding
const encrypted = AES.encrypt('message', 'password', {
  padding: AnsiX923
}).toString();
```

#### ISO10126

```typescript
import { AES, ISO10126 } from 'crypto-es';

// ISO 10126 padding
const encrypted = AES.encrypt('message', 'password', {
  padding: ISO10126
}).toString();
```

#### ISO97971

```typescript
import { AES, ISO97971 } from 'crypto-es';

// ISO/IEC 9797-1 padding
const encrypted = AES.encrypt('message', 'password', {
  padding: ISO97971
}).toString();
```

#### ZeroPadding

```typescript
import { AES, ZeroPadding } from 'crypto-es';

// Zero padding
const encrypted = AES.encrypt('message', 'password', {
  padding: ZeroPadding
}).toString();
```

#### NoPadding

```typescript
import { AES, NoPadding, WordArray } from 'crypto-es';

// No padding (message must be multiple of block size)
const message = WordArray.create([0x00112233, 0x44556677, 0x8899aabb, 0xccddeeff]);
const encrypted = AES.encrypt(message, 'password', {
  padding: NoPadding
}).toString();
```

## 🔧 Advanced Topics

### Working with WordArray

```typescript
import { WordArray, UTF8, Hex, Base64 } from 'crypto-es';

// Create WordArray from different sources
const wa1 = WordArray.create([0x12345678, 0x9abcdef0]);
const wa2 = WordArray.random(16); // 16 random bytes
const wa3 = UTF8.parse('Hello World');
const wa4 = Hex.parse('48656c6c6f');
const wa5 = Base64.parse('SGVsbG8=');

// Concatenate WordArrays
const combined = wa1.concat(wa2).concat(wa3);

// Clone WordArray
const cloned = wa1.clone();

// Get bytes
const bytes = wa1.sigBytes;

// Convert to different formats
const hex = wa1.toString(Hex);
const base64 = wa1.toString(Base64);
const utf8 = wa1.toString(UTF8);
```

### Streaming Large Files

```typescript
import { SHA256Algo, AESAlgo, WordArray } from 'crypto-es';

// Hash large file in chunks
async function hashLargeFile(file: File): Promise<string> {
  const hasher = SHA256Algo.create();
  const chunkSize = 1024 * 1024; // 1MB chunks
  
  for (let offset = 0; offset < file.size; offset += chunkSize) {
    const chunk = file.slice(offset, offset + chunkSize);
    const arrayBuffer = await chunk.arrayBuffer();
    const wordArray = WordArray.create(arrayBuffer);
    hasher.update(wordArray);
  }
  
  return hasher.finalize().toString();
}

// Encrypt large data stream
function encryptStream(key: WordArray, iv: WordArray) {
  const cipher = AESAlgo.createEncryptor(key, { iv });
  
  return {
    process: (chunk: string) => cipher.process(chunk),
    finalize: () => cipher.finalize()
  };
}
```

### Custom Cipher Configuration

```typescript
import { AES, CBC, PKCS7, SerializableCipher, OpenSSLFormatter } from 'crypto-es';

// Create custom cipher configuration
const cipherParams = {
  mode: CBC,
  padding: PKCS7,
  format: OpenSSLFormatter,
  blockSize: 128/32,
  formatter: OpenSSLFormatter
};

// Use with encryption
const encrypted = AES.encrypt('message', 'password', cipherParams);

// Serialize/deserialize encrypted data
const serialized = encrypted.toString();
const deserialized = SerializableCipher.parse(serialized);
```

### HMAC for API Authentication

```typescript
import { HmacSHA256, Hex } from 'crypto-es';

// Create API signature
function createApiSignature(
  method: string,
  path: string,
  body: string,
  secret: string
): string {
  const message = `${method}\n${path}\n${body}`;
  return HmacSHA256(message, secret).toString(Hex);
}

// Verify webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = HmacSHA256(payload, secret).toString(Hex);
  return signature === expectedSignature;
}
```

### Password Storage Best Practices

```typescript
import { PBKDF2, SHA256Algo, WordArray, Hex } from 'crypto-es';

// Hash password for storage
function hashPassword(password: string): { hash: string; salt: string } {
  const salt = WordArray.random(128/8);
  const hash = PBKDF2(password, salt, {
    keySize: 256/32,
    iterations: 100000,
    hasher: SHA256Algo
  });
  
  return {
    hash: hash.toString(Hex),
    salt: salt.toString(Hex)
  };
}

// Verify password
function verifyPassword(
  password: string,
  storedHash: string,
  storedSalt: string
): boolean {
  const salt = Hex.parse(storedSalt);
  const hash = PBKDF2(password, salt, {
    keySize: 256/32,
    iterations: 100000,
    hasher: SHA256Algo
  });
  
  return hash.toString(Hex) === storedHash;
}
```

## 🌐 Browser & Node.js Compatibility

### Browser Usage

```html
<!-- Via CDN -->
<script src="https://unpkg.com/crypto-es@latest/dist/index.js"></script>
<script>
  const hash = cryptoEs.SHA256('message').toString();
</script>
```

### Webpack Configuration

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      crypto: false // crypto-es doesn't need Node crypto
    }
  }
};
```

### Vite Configuration

```javascript
// vite.config.js
export default {
  optimizeDeps: {
    include: ['crypto-es']
  }
};
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

## 📊 API Reference

### Core Classes

#### WordArray

```typescript
class WordArray {
  static create(words?: number[], sigBytes?: number): WordArray;
  static random(nBytes: number): WordArray;
  
  sigBytes: number;
  words: number[];
  
  concat(wordArray: WordArray): WordArray;
  clone(): WordArray;
  toString(encoder?: Encoder): string;
}
```

#### CipherParams

```typescript
class CipherParams {
  ciphertext: WordArray;
  key?: WordArray;
  iv?: WordArray;
  salt?: WordArray;
  algorithm?: Cipher;
  mode?: Mode;
  padding?: Padding;
  blockSize?: number;
  formatter?: Formatter;
  
  static create(cipherParams: Partial<CipherParams>): CipherParams;
  toString(formatter?: Formatter): string;
}
```

#### Hasher

```typescript
interface Hasher {
  update(messageUpdate: string | WordArray): Hasher;
  finalize(messageUpdate?: string | WordArray): WordArray;
}
```

#### Cipher

```typescript
interface Cipher {
  encrypt(message: string | WordArray, key: string | WordArray, cfg?: CipherCfg): CipherParams;
  decrypt(ciphertext: string | CipherParams, key: string | WordArray, cfg?: CipherCfg): WordArray;
}
```

## 🚀 Performance Tips

1. **Use streaming for large data**: Process data in chunks with `update()` and `finalize()`
2. **Choose appropriate algorithms**: SHA256 for general hashing, AES for encryption
3. **Reuse hasher instances**: Create once, reset and reuse for multiple operations
4. **Use typed arrays**: Convert ArrayBuffer to WordArray for better performance
5. **Enable tree-shaking**: Import only needed algorithms to reduce bundle size

## 🔒 Security Considerations

### ⚠️ Important Security Notes

1. **Never use MD5 or SHA1 for security**: These are broken algorithms, use SHA256 or higher
2. **Always use authenticated encryption**: Combine encryption with HMAC for integrity
3. **Use sufficient iterations for PBKDF2**: Minimum 10,000, recommend 100,000+
4. **Generate random IVs**: Never reuse IVs with the same key
5. **Use constant-time comparison**: Prevent timing attacks when comparing hashes
6. **Store passwords properly**: Use PBKDF2 with salt, never store plain text
7. **Avoid ECB mode**: Use CBC, CTR, or GCM modes instead

### Recommended Algorithms

- **Hashing**: SHA256, SHA512, SHA3
- **Encryption**: AES with 256-bit keys
- **Key Derivation**: PBKDF2 with 100,000+ iterations
- **HMAC**: HmacSHA256 or HmacSHA512

## 🛠️ Development

### Setup

```bash
# Clone repository
git clone https://github.com/entronad/crypto-es.git
cd crypto-es

# Install dependencies
npm install

# Build library
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Available Scripts

- `npm run build` - Build the library
- `npm run build:watch` - Build in watch mode
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run typecheck` - Check TypeScript types
- `npm run clean` - Clean build artifacts

### Project Structure

```
crypto-es/
├── src/                # Source code
│   ├── core.ts        # Core utilities
│   ├── cipher-core.ts # Cipher base classes
│   ├── md5.ts         # MD5 implementation
│   ├── sha256.ts      # SHA256 implementation
│   ├── aes.ts         # AES implementation
│   └── ...            # Other algorithms
├── __tests__/         # Test files
├── dist/              # Built output
│   ├── *.mjs         # ESM modules
│   ├── *.cjs         # CommonJS modules
│   └── *.d.ts        # TypeScript definitions
└── package.json       # Package configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Guidelines

- Write tests for new features
- Ensure all tests pass
- Follow existing code style
- Update documentation as needed
- Add yourself to contributors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT © [LIN Chen](https://github.com/entronad)

---

**Note**: This library is for legitimate use only. Always follow your local laws and regulations regarding cryptography.