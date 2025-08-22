import crypto from './dist/index.mjs';

const { Hex } = crypto.enc;

// Test SerializableCipher directly
const key = Hex.parse('000102030405060708090a0b0c0d0e0f');
const message = 'Test';

console.log('Testing SerializableCipher.encrypt with Blowfish...');
const result = crypto.lib.SerializableCipher.encrypt(
  crypto.algo.Blowfish,
  message,
  key
);

console.log('Result:', result);
console.log('Result.ciphertext:', result.ciphertext);
console.log('Result.ciphertext toString:', result.ciphertext ? result.ciphertext.toString() : 'undefined');
