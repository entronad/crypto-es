import crypto from './dist/index.mjs';

const { Hex } = crypto.enc;

const saltA = Hex.parse('AA00000000000000');
console.log('Salt:', saltA);
console.log('Salt toString:', saltA.toString());

try {
  const encrypted = crypto.Blowfish.encrypt('Test', 'pass', { 
    salt: saltA, 
    hasher: crypto.algo.SHA256 
  });
  
  console.log('Encrypted object:', encrypted);
  console.log('Encrypted.salt:', encrypted.salt);
  console.log('Encrypted.ciphertext:', encrypted.ciphertext);
  
  const encryptedStr = encrypted.toString();
  console.log('Encrypted string:', encryptedStr);
} catch (err) {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
}
