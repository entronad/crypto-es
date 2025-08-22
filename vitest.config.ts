import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test environment
    environment: 'node',
    
    // Test file patterns
    include: ['__tests__/**/*.test.ts'],
    
    // Exclude patterns
    exclude: ['node_modules', 'dist'],
    
    // Enable global test APIs (describe, it, expect, etc.)
    globals: true,
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '__tests__/',
        '*.config.ts',
        '*.config.js',
      ],
    },
    
    // Test timeout
    testTimeout: 10000,
    
    // Hook timeout
    hookTimeout: 10000,
    
    // Disable threads for better compatibility
    threads: false,
    
    // Max concurrent tests
    maxConcurrency: 5,
    
    // Reporter
    reporters: ['verbose'],
    
    // Watch mode configuration
    watch: false,
    
    // Retry failed tests
    retry: 0,
    
    // Random order
    sequence: {
      shuffle: false,
    },
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  
  // Build configuration for test files
  esbuild: {
    target: 'node18',
  },
});