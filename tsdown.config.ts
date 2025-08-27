import { defineConfig } from 'tsdown';

export default defineConfig({
  // Entry points for the library
  entry: ['./src/index.ts'],
  
  // Output formats: ESM and CommonJS for maximum compatibility
  format: ['esm', 'cjs'],
  
  // Clean output directory before building
  clean: true,
  
  // Generate TypeScript declaration files
  dts: true,
  
  // Target modern JavaScript environments
  target: 'node18',
  
  // Platform-specific optimizations
  platform: 'neutral',
  
  // External dependencies (none for this library)
  external: [],
  
  // Enable unbundled mode - we want separate files for better tree-shaking
  unbundle: true,
  
  // Output directory structure
  outDir: 'dist',
  
  // Minification disabled for library code (let consumers handle this)
  minify: false,
  
  // Generate source maps for better debugging
  sourcemap: true,
  
  // Treeshaking to remove unused code
  treeshake: true,
  
  // Fix import extensions for ESM compatibility
  fixedExtension: true,
  
  // Validate exports field in package.json
  exports: true,
  
  // Publint validation
  publint: true,
  
  // Custom output configuration for different formats
  outExtension({ format }) {
    if (format === 'esm') {
      return {
        js: '.mjs',
      };
    }
    if (format === 'cjs') {
      return {
        js: '.cjs',
      };
    }
    return {};
  },
  
  // Success callback
  onSuccess() {
    console.info('✅ Build succeeded!');
  },
  
  // Failure callback
  onFailure(error) {
    console.error('❌ Build failed:', error);
  },
});