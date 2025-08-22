import crypto from './dist/index.mjs';

const { WordArray } = crypto.lib;

const message = WordArray.create([0x00112233, 0x44556677, 0x8899aabb, 0xccddeeff]);
const key = WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);

console.log('Creating encryptor...');
const AESAlgo = crypto.algo.AES;
const encryptor = AESAlgo.createEncryptor(key);

console.log('After creation:');
console.log('  _nRounds:', encryptor._nRounds);
console.log('  _keySchedule:', !!encryptor._keySchedule);

// Try encrypting directly
const ciphertext = encryptor.finalize(message);
console.log('\nCiphertext:', ciphertext.toString());
console.log('Expected:    69c4e0d86a7b0430d8cdb78070b4c55a');
console.log('Match:', ciphertext.toString().startsWith('69c4e0d86a7b0430d8cdb78070b4c55a'));
