# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Language Requirement
**All conversation and responses should be in Chinese (中文).**
**ALL generated content (code, comments, documentation, etc.) MUST be written in English. This includes code comments, commit messages, documentation, and any other text content.**

## Project Overview

crypto-es is a TypeScript cryptography library providing hash algorithms, ciphers, and encoding utilities. It's the successor to crypto-js, modernized with native TypeScript and ES modules support.

## Common Development Commands

```bash
# Build the library (uses tsdown)
npm run build
npm run build:verbose  # Shows detailed output

# Run tests (uses vitest)
npm test               # Run all tests once
npm run test:watch     # Watch mode
npm run test:coverage  # Generate coverage report
npm run test:verbose   # Verbose output for debugging

# Type checking
npm run typecheck
npm run typecheck:verbose  # Shows all type errors

# Development
npm run dev            # Watch mode build
npm run check          # Run both typecheck and tests

# Clean build artifacts
npm run clean
```

## Architecture

### Module Structure
- **Core modules** (`src/core.ts`, `src/cipher-core.ts`): Base classes and utilities like WordArray, Hasher, Cipher
- **Hash algorithms** (`src/md5.ts`, `src/sha*.ts`, etc.): Individual hash implementations
- **Cipher algorithms** (`src/aes.ts`, `src/des.ts`, `src/rc4.ts`, etc.): Encryption/decryption implementations
- **Encoding** (`src/enc-*.ts`): Encoders for Base64, Hex, UTF-8, UTF-16
- **Modes & Padding** (`src/mode-*.ts`, `src/pad-*.ts`): Block cipher modes (CBC, ECB, etc.) and padding schemes

### Key Design Patterns
- **WordArray**: Central data structure representing arrays of 32-bit words, used throughout for binary data
- **Algorithm classes**: Each algorithm has an `Algo` class for the implementation and a helper function for direct usage
- **Progressive processing**: Most algorithms support progressive hashing/encryption via `update()` and `finalize()` methods
- **TypeScript strict mode**: All code must pass strict TypeScript checks

### Build System
- **tsdown**: Handles TypeScript compilation, generating both ESM (.js) and CommonJS (.cjs) outputs
- **Unbundled output**: Each module is compiled separately for better tree-shaking
- **Dual module support**: Package exports both ESM and CommonJS formats

### Testing Strategy
- **vitest**: Test runner with comprehensive test suite in `__tests__/`
- **Test isolation**: Each algorithm has its own test file
- **Coverage requirements**: Maintain high test coverage across all algorithms

## Important Considerations

- **Type Safety**: Always maintain strict TypeScript types. Run `npm run typecheck` before committing
- **API Compatibility**: Maintain backward compatibility with the existing API surface
- **Module Exports**: Use named exports for tree-shaking, while maintaining the default CryptoES export
- **Algorithm Accuracy**: Cryptographic implementations must be precise - always verify against test vectors
- **Performance**: WordArray operations are performance-critical - avoid unnecessary allocations