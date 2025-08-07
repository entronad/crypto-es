# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Language Requirement
**All conversation and responses should be in Chinese (中文).**
**ALL generated content (code, comments, documentation, etc.) MUST be written in English. This includes code comments, commit messages, documentation, and any other text content.**

## Project Overview
crypto-es is a modern ECMAScript 6+ cryptography library that provides TypeScript implementations of various cryptographic algorithms. It's a refactored version of CryptoJS with ES6 module support, now fully migrated to TypeScript.

## Project Structure
```
crypto-es/
├── src/                  # TypeScript source files
│   ├── core.ts          # Core base classes and WordArray
│   ├── cipher-core.ts   # Cipher infrastructure
│   ├── index.ts         # Main entry point
│   └── *.ts             # Individual algorithm implementations
├── __tests__/           # Jest test files  
│   └── *.test.ts       # Test files for each algorithm
├── dist/                # Compiled JavaScript output
└── tsconfig.json        # TypeScript configuration
```

## Development Commands

### Building and Type Checking
```bash
# Build the project (compile TypeScript to JavaScript)
npm run build

# Build with full error output (RECOMMENDED for debugging)
npm run build:verbose

# Type check only (no output files)
npm run typecheck

# Type check with full error output (RECOMMENDED for debugging)
npm run typecheck:verbose

# Clean build output
npm run clean
```

### Testing
```bash
# Run all tests
npm test

# Run tests with full output (RECOMMENDED for debugging)
npm run test:verbose

# Run specific test file
npm test -- aes.test.ts

# Debug mode
npm run debug
```

### Important Note on Shell Redirection
⚠️ **WARNING**: When using the Bash tool in Claude Code, direct use of shell redirection operators like `2>&1` may not work correctly. The operators might be incorrectly parsed as command arguments. Always use the `:verbose` versions of commands which properly wrap the command with `sh -c` to handle redirection correctly.

Example:
- ❌ `npm run build 2>&1` - May fail with "Cannot resolve the path '2'"
- ✅ `npm run build:verbose` - Correctly captures all output

## Architecture

### Core Structure
The library follows a modular architecture where each algorithm is implemented as a separate TypeScript module:

1. **Core Components** (`src/core.ts`):
   - `Base`: Base class for all algorithms
   - `WordArray`: Core data structure representing arrays of 32-bit words
   - `Hasher`: Base class for hash algorithms
   - `BufferedBlockAlgorithm`: Base for block-based processing
   - `Hex`, `Latin1`, `Utf8`: Basic encoding strategies

2. **Cipher Infrastructure** (`src/cipher-core.ts`):
   - `Cipher`, `BlockCipher`, `StreamCipher`: Base cipher implementations
   - `CipherParams`: Encapsulates cipher parameters (key, IV, salt, etc.)
   - `BlockCipherMode`: Base class for block cipher modes
   - `CBC`: Cipher Block Chaining mode (with Encryptor/Decryptor)
   - `Pkcs7`: PKCS#7 padding implementation
   - `SerializableCipher`, `PasswordBasedCipher`: High-level cipher interfaces
   - `OpenSSLFormatter`, `OpenSSLKdf`: OpenSSL compatibility

3. **Algorithm Categories**:
   - **Hash Functions**: MD5, SHA1, SHA2 (224/256/384/512), SHA3, RIPEMD160
   - **Ciphers**: AES, DES/TripleDES, Rabbit, RC4, Blowfish
   - **Key Derivation**: PBKDF2, EvpKDF
   - **Message Authentication**: HMAC variants for each hash function
   - **Encoders**: Base64, Base64url, Hex, UTF8, UTF16, Latin1

4. **Block Cipher Modes** (separate modules):
   - `src/mode-cbc.ts`: Cipher Block Chaining (included in cipher-core)
   - `src/mode-cfb.ts`: Cipher Feedback
   - `src/mode-ctr.ts`: Counter
   - `src/mode-ctr-gladman.ts`: Counter (Gladman variant)
   - `src/mode-ecb.ts`: Electronic Codebook
   - `src/mode-ofb.ts`: Output Feedback

5. **Padding Schemes** (separate modules):
   - `src/pad-pkcs7.ts`: PKCS#7 (included in cipher-core)
   - `src/pad-ansix923.ts`: ANSI X9.23
   - `src/pad-iso10126.ts`: ISO 10126
   - `src/pad-iso97971.ts`: ISO/IEC 9797-1
   - `src/pad-nopadding.ts`: No padding
   - `src/pad-zeropadding.ts`: Zero padding

### Module Pattern
Each algorithm module typically exports:
- Algorithm class (e.g., `AESAlgo`)
- Helper functions for direct use (e.g., `AES.encrypt()`, `AES.decrypt()`)
- HMAC variant where applicable (e.g., `HmacSHA256`)

### Main Export (`src/index.ts`)
The main index file exports a default object with the following structure:
```typescript
export default {
  lib: { /* Core classes */ },
  x64: { /* 64-bit word support */ },
  enc: { /* Encoders */ },
  algo: { /* Algorithm classes */ },
  mode: { /* Block cipher modes */ },
  pad: { /* Padding schemes */ },
  format: { /* Formatters */ },
  kdf: { /* Key derivation functions */ },
  // Direct algorithm exports
  MD5, HmacMD5, SHA1, HmacSHA1, /* ... etc */
}
```

## Key Design Principles

1. **WordArray-Centric**: All cryptographic operations work with WordArray objects internally
2. **Progressive Processing**: Algorithms support streaming/progressive updates via `update()` and `finalize()` pattern
3. **Configurable Output**: Hash and cipher outputs can be formatted as Hex, Base64, or other encodings
4. **OpenSSL Compatibility**: Default cipher format is OpenSSL-compatible for interoperability
5. **TypeScript Native**: Fully written in TypeScript with strong typing throughout

## Testing Approach
- Unit tests for each algorithm in `__tests__/` directory
- Tests verify against known test vectors
- Tests check both single-pass and progressive/streaming operations
- Tests validate encoding/decoding consistency
- Tests use Jest with experimental ES modules support

## Common Development Tasks

### Checking for Type Errors
```bash
# Always use the verbose version to see all errors
npm run typecheck:verbose
```

### Building After Changes
```bash
# Build and see any compilation errors
npm run build:verbose
```

### Running Tests After Fixes
```bash
# Run all tests with detailed output
npm run test:verbose
```

### Debugging Test Failures
```bash
# Run a specific test file
npm test -- sha256.test.ts

# Use the debug script for troubleshooting
npm run debug
```

## Known Issues and Solutions

### Issue: Shell Redirection Not Working
**Problem**: Commands like `npm run build 2>&1` fail with "Cannot resolve the path '2'"
**Solution**: Use the `:verbose` scripts which properly handle redirection with `sh -c`

### Issue: TypeScript Compilation Errors
**Problem**: Various TS errors including private property exports, deprecated options
**Solution**: Run `npm run typecheck:verbose` to see all errors and fix them systematically

### Issue: Test Import Paths
**Problem**: Tests may fail due to incorrect import paths
**Solution**: Ensure all test imports use `../src/index` (without .js extension)

## Tips for Claude Code

1. **Always use verbose commands** when debugging build or test issues
2. **Check types first** with `npm run typecheck:verbose` before building
3. **Read error messages carefully** - TypeScript errors often indicate the exact issue
4. **Use the proper import paths** - TypeScript handles module resolution differently
5. **Test incrementally** - Fix one type of error at a time and verify