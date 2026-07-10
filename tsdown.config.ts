import { defineConfig } from 'tsdown';

export default defineConfig({
  // Entry points for the library
  entry: ['./src/index.ts'],
  
  // Output formats: ESM only
  format: 'esm',
  
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
  
  // Disable source maps for smaller bundle size
  sourcemap: false,
  
  // Treeshaking to remove unused code
  treeshake: true,
  
  // Fix import extensions for ESM compatibility
  fixedExtension: true,
  
  // Validate exports field in package.json
  // Disabled to manually manage package.json exports
  exports: true,
  
  // Publint validation
  publint: true,
  
  // Success callback
  onSuccess() {
    console.info('✅ Build succeeded!');
  },
});