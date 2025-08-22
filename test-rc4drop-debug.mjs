import crypto from './dist/index.mjs';

const { WordArray, Hex } = crypto.enc;

const message = Hex.parse('0000000000000000');
const key = Hex.parse('0123456789abcdef');

// Check algo exports
console.log('crypto.algo.RC4Drop:', crypto.algo.RC4Drop);
console.log('crypto.algo.RC4DropAlgo:', crypto.algo.RC4DropAlgo);

// Use the correct class
const RC4DropAlgo = crypto.algo.RC4Drop;
if (RC4DropAlgo) {
  const encryptor = RC4DropAlgo.createEncryptor(key, { drop: 2 });
  console.log('Encryptor cfg:', encryptor.cfg);
  console.log('Encryptor cfg.drop:', encryptor.cfg.drop);
  
  const ciphertext = encryptor.finalize(message);
  console.log('Ciphertext:', ciphertext.toString());
}

// Test the helper
const result = crypto.RC4Drop.encrypt(message, key, { drop: 2 });
console.log('Helper result:', result.ciphertext.toString());
