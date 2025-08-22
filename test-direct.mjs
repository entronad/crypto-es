import { AESAlgo } from './dist/aes.mjs';
import { WordArray } from './dist/core.mjs';

const key = WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);

console.log('Creating AES instance directly...');
const aes = new AESAlgo(1, key); // 1 = encrypt mode

console.log('After constructor:');
console.log('  _nRounds:', aes._nRounds);
console.log('  _keySchedule:', !!aes._keySchedule);

// Check if reset works
console.log('\nCalling reset manually...');
aes.reset();
console.log('After reset:');
console.log('  _nRounds:', aes._nRounds);
console.log('  _keySchedule:', !!aes._keySchedule);
