import { describe, it, expect } from 'vitest';
import { AES, Utf8 } from '../src';

describe('AES Round-trip Tests', () => {
  it('should correctly encrypt and decrypt English text', () => {
    const plaintext = 'Secret Message';
    const key = 'secret key';
    
    const encrypted = AES.encrypt(plaintext, key);
    const decrypted = AES.decrypt(encrypted.toString(), key);
    
    expect(decrypted.toString(Utf8)).toBe(plaintext);
    expect(decrypted.sigBytes).toBeGreaterThan(0);
  });

  it('should correctly encrypt and decrypt Chinese text', () => {
    const plaintext = '漢字（中文）';
    const key = '12345678';
    
    const encrypted = AES.encrypt(plaintext, key);
    const decrypted = AES.decrypt(encrypted.toString(), key);
    
    expect(decrypted.toString(Utf8)).toBe(plaintext);
    expect(decrypted.sigBytes).toBeGreaterThan(0);
  });

  it('should correctly encrypt and decrypt mixed content', () => {
    const plaintext = 'Hello 世界 123! @#$%';
    const key = 'test-key-2024';
    
    const encrypted = AES.encrypt(plaintext, key);
    const decrypted = AES.decrypt(encrypted.toString(), key);
    
    expect(decrypted.toString(Utf8)).toBe(plaintext);
    expect(decrypted.sigBytes).toBeGreaterThan(0);
  });

  it('should handle empty strings', () => {
    const plaintext = '';
    const key = 'key';
    
    const encrypted = AES.encrypt(plaintext, key);
    const decrypted = AES.decrypt(encrypted.toString(), key);
    
    expect(decrypted.toString(Utf8)).toBe(plaintext);
    expect(decrypted.sigBytes).toBe(0);
  });

  it('should handle long texts', () => {
    const plaintext = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(100);
    const key = 'long-text-key';
    
    const encrypted = AES.encrypt(plaintext, key);
    const decrypted = AES.decrypt(encrypted.toString(), key);
    
    expect(decrypted.toString(Utf8)).toBe(plaintext);
    expect(decrypted.sigBytes).toBeGreaterThan(0);
  });

  it('should never return negative sigBytes after decryption', () => {
    const testCases = [
      { text: 'a', key: 'k' },
      { text: 'test', key: 'key' },
      { text: 'Hello World', key: 'secret' },
      { text: '測試中文', key: 'password' },
      { text: '🚀 Emoji test 🎉', key: 'emoji-key' },
    ];

    testCases.forEach(({ text, key }) => {
      const encrypted = AES.encrypt(text, key);
      const decrypted = AES.decrypt(encrypted.toString(), key);
      
      expect(decrypted.sigBytes).toBeGreaterThanOrEqual(0);
      expect(decrypted.toString(Utf8)).toBe(text);
    });
  });

  it('should verify AES lookup tables are initialized', () => {
    // This test ensures the IIFE initialization runs
    // by checking that encryption produces consistent results
    const plaintext = 'Test initialization';
    const key = 'init-key';
    
    const encrypted1 = AES.encrypt(plaintext, key);
    const encrypted2 = AES.encrypt(plaintext, key);
    
    // While salts will differ, decryption should work
    const decrypted1 = AES.decrypt(encrypted1.toString(), key);
    const decrypted2 = AES.decrypt(encrypted2.toString(), key);
    
    expect(decrypted1.toString(Utf8)).toBe(plaintext);
    expect(decrypted2.toString(Utf8)).toBe(plaintext);
  });
});