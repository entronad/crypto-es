import crypto from './dist/index.mjs';

const { WordArray, Hex } = crypto.enc;

// Test RC4Drop with drop: 2
console.log('Testing RC4Drop with drop: 2');

const message = Hex.parse('0000000000000000');
const key = Hex.parse('0123456789abcdef');

// RC4Drop with drop: 2 (should drop 2 keystream words = 8 bytes)
const rc4drop_result = crypto.RC4Drop.encrypt(message, key, { drop: 2 });
console.log('RC4Drop result:', rc4drop_result.ciphertext.toString());

// Regular RC4 with longer message to compare
const longMessage = Hex.parse('00000000000000000000000000000000');
const rc4_result = crypto.RC4.encrypt(longMessage, key);
const fullCiphertext = rc4_result.ciphertext.toString();
console.log('RC4 full result:', fullCiphertext);
console.log('RC4 from byte 16:', fullCiphertext.substr(16));

console.log('\nExpected:', fullCiphertext.substr(16));
console.log('Got:', rc4drop_result.ciphertext.toString());
console.log('Match:', rc4drop_result.ciphertext.toString() === fullCiphertext.substr(16));
