import crypto from './dist/index.mjs';

const { WordArray } = crypto.lib;

// Test AES encryption
const message = WordArray.create([0x00112233, 0x44556677, 0x8899aabb, 0xccddeeff]);
const key = WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);

console.log('Testing AES encryption debug...');

// Create encryptor using the AES class from algo
const AESAlgo = crypto.algo.AES;

// Create encryptor and trace the process
console.log('\n=== Creating encryptor ===');
const encryptor = AESAlgo.createEncryptor(key);

console.log('Encryptor created');
console.log('typeof encryptor._doReset:', typeof encryptor._doReset);
console.log('Encryptor class name:', encryptor.constructor.name);

// Check state before reset
console.log('\n=== State before manual reset ===');
console.log('_nRounds:', encryptor._nRounds);
console.log('_keySchedule:', encryptor._keySchedule);

// Manually call reset
console.log('\n=== Calling reset manually ===');
try {
  encryptor.reset();
  console.log('Reset called successfully');
} catch (err) {
  console.log('Error calling reset:', err.message);
}

// Check state after reset
console.log('\n=== State after reset ===');
console.log('_nRounds:', encryptor._nRounds);
console.log('_keySchedule exists:', !!encryptor._keySchedule);

// Try to encrypt
console.log('\n=== Encrypting ===');
const ciphertext = encryptor.finalize(message);

console.log('Ciphertext:', ciphertext.toString());
console.log('Expected:    69c4e0d86a7b0430d8cdb78070b4c55a');
