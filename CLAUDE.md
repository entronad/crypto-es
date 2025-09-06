# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Language Requirement
**All conversation and responses should be in Chinese (中文).**
**ALL generated content (code, comments, documentation, etc.) MUST be written in English. This includes code comments, commit messages, documentation, and any other text content.**

## Project Overview
This is `crypto-es`, a modern TypeScript cryptography library providing ES6-compatible implementations of various hashing and encryption algorithms. The library outputs both ESM and CommonJS formats for maximum compatibility.

## Development Commands

### Building
- `npm run build` - Build the library using tsdown
- `npm run build:verbose` - Build with detailed output
- `npm run build:watch` - Watch mode for development
- `npm run dev` - Alias for build:watch

### Testing
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Open Vitest UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:verbose` - Run tests with detailed output

To run a specific test file:
```bash
npx vitest run __tests__/[filename].test.ts
```

### Type Checking & Validation
- `npm run typecheck` - Check TypeScript types
- `npm run typecheck:verbose` - Type check with detailed output
- `npm run lint` - Alias for typecheck
- `npm run check` - Run both typecheck and tests

### Other Commands
- `npm run clean` - Remove dist directory

## Architecture

### Core Structure
The library is organized as a flat module structure in `/src` with each algorithm in its own file:

1. **Core modules** (`core.ts`, `cipher-core.ts`, `x64-core.ts`) - Base classes and utilities for all cryptographic operations
2. **Hash algorithms** - MD5, SHA1, SHA224, SHA256, SHA384, SHA512, SHA3, RIPEMD160
3. **Cipher algorithms** - AES, DES, TripleDES, Rabbit, RC4, Blowfish
4. **Key derivation** - PBKDF2, EvpKDF
5. **Cipher modes** - ECB, CBC, CFB, CTR, OFB
6. **Padding schemes** - PKCS7, AnsiX923, ISO10126, ISO97971, NoPadding, ZeroPadding
7. **Encoders** - Base64, Base64url, Hex, UTF8, UTF16, Latin1

### Build System
- Uses `tsdown` for building (configuration in `tsdown.config.ts`)
- Outputs to `/dist` with both `.mjs` (ESM) and `.cjs` (CommonJS) files
- Generates TypeScript declarations (`.d.ts` files)
- Source maps included for debugging
- Tree-shaking enabled for optimal bundle size

### Testing
- Tests located in `/__tests__` directory
- Uses Vitest with Node.js environment
- Each algorithm has its own test file
- Tests verify correctness against known test vectors

### Key Design Patterns
1. **Algorithm classes** - Each algorithm has both a functional API (e.g., `MD5()`) and class-based API (e.g., `MD5Algo`)
2. **WordArray** - Core data structure for handling binary data efficiently
3. **Streaming API** - Support for processing data in chunks via `process()` and `finalize()` methods
4. **HMAC support** - Hash algorithms include HMAC variants (e.g., `HmacMD5`, `HmacSHA256`)
