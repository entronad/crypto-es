# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Language Requirement
**All conversation and responses should be in Chinese (中文).**
**ALL generated content (code, comments, documentation, etc.) MUST be written in English. This includes code comments, commit messages, documentation, and any other text content.**

## Project Overview
crypto-es is a modern ECMAScript 6+ cryptography library that provides TypeScript-compatible implementations of various cryptographic algorithms. It's a refactored version of CryptoJS with ES6 module support.

## Development Commands

### Running Tests
```bash
# Run all tests using Jest with experimental ES modules support
npm test

# Debug mode for testing
npm run debug
```

### Testing Individual Algorithms
Tests are located in `__tests__/` directory with pattern `*.test.ts`. To run specific tests:
```bash
npm test -- aes.test.ts  # Test specific algorithm
```

## Architecture

### Core Structure
The library follows a modular architecture where each algorithm is implemented as a separate ES module:

1. **Core Components** (`lib/core.js`):
   - `Base`: Base class for all algorithms
   - `WordArray`: Core data structure representing arrays of 32-bit words
   - `Hasher`: Base class for hash algorithms
   - `BufferedBlockAlgorithm`: Base for block-based processing

2. **Cipher Infrastructure** (`lib/cipher-core.js`):
   - `Cipher`, `BlockCipher`, `StreamCipher`: Base cipher implementations
   - `CipherParams`: Encapsulates cipher parameters (key, IV, salt, etc.)
   - Block modes (CBC, CFB, CTR, ECB, OFB)
   - Padding schemes (Pkcs7, AnsiX923, Iso10126, etc.)

3. **Algorithm Categories**:
   - **Hash Functions**: MD5, SHA1, SHA2 (224/256/384/512), SHA3, RIPEMD160
   - **Ciphers**: AES, DES/TripleDES, Rabbit, RC4, Blowfish
   - **Key Derivation**: PBKDF2, EvpKDF
   - **Message Authentication**: HMAC variants for each hash function
   - **Encoders**: Base64, Base64url, Hex, UTF8, UTF16, Latin1

### Module Pattern
Each algorithm module exports:
- Algorithm class (e.g., `AESAlgo`)
- Helper function for direct use (e.g., `AES.encrypt()`)
- HMAC variant where applicable (e.g., `HmacSHA256`)

### TypeScript Support
Every JavaScript file has a corresponding `.d.ts` TypeScript declaration file providing full type definitions. The library is designed for both JavaScript and TypeScript usage.

## Key Design Principles

1. **WordArray-Centric**: All cryptographic operations work with WordArray objects internally
2. **Progressive Processing**: Algorithms support streaming/progressive updates via `update()` and `finalize()` pattern
3. **Configurable Output**: Hash and cipher outputs can be formatted as Hex, Base64, or other encodings
4. **OpenSSL Compatibility**: Default cipher format is OpenSSL-compatible for interoperability

## Testing Approach
- Unit tests for each algorithm in `__tests__/` directory
- Tests verify against known test vectors
- Tests check both single-pass and progressive/streaming operations
- Tests validate encoding/decoding consistency