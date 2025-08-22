import crypto from './dist/index.mjs';

const { WordArray } = crypto.lib;

// Test AES encryption
const message = WordArray.create([0x00112233, 0x44556677, 0x8899aabb, 0xccddeeff]);
const key = WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);

console.log('Testing AES direct encryption...');
console.log('Message:', message.toString());
console.log('Key:', key.toString());

// Create encryptor using the AES class from algo
const AESAlgo = crypto.algo.AES;
console.log('AESAlgo:', AESAlgo);
console.log('AESAlgo.createEncryptor:', AESAlgo.createEncryptor);

const encryptor = AESAlgo.createEncryptor(key);

// Check if _doReset was called
console.log('Encryptor blockSize:', encryptor.blockSize);
console.log('Encryptor _nRounds:', encryptor._nRounds);
console.log('Encryptor _keySchedule exists:', !!encryptor._keySchedule);

// Try to encrypt
const ciphertext = encryptor.finalize(message);

console.log('Ciphertext:', ciphertext.toString());
console.log('Expected:    69c4e0d86a7b0430d8cdb78070b4c55a');
console.log('Match:', ciphertext.toString() === '69c4e0d86a7b0430d8cdb78070b4c55a');
