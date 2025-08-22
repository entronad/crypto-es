import crypto from './dist/index.mjs';

const { Hex } = crypto.enc;

const saltA = Hex.parse('AA00000000000000');
const message = 'Test';
const password = 'pass';

console.log('Testing PasswordBasedCipher.encrypt with Blowfish...');

// Get derived params first
const keySize = crypto.algo.Blowfish.keySize || 4; // 128 bits / 32
const ivSize = crypto.algo.Blowfish.ivSize || 2;   // 64 bits / 32
console.log('keySize:', keySize, 'ivSize:', ivSize);

// Derive key using OpenSSL KDF
const derivedParams = crypto.kdf.OpenSSL.execute(
  password,
  keySize,
  ivSize,
  saltA,
  crypto.algo.SHA256
);

console.log('Derived params:', derivedParams);
console.log('  key:', derivedParams.key ? derivedParams.key.toString() : 'undefined');
console.log('  iv:', derivedParams.iv ? derivedParams.iv.toString() : 'undefined');
console.log('  salt:', derivedParams.salt ? derivedParams.salt.toString() : 'undefined');

// Now encrypt with the derived key
const cfg = { iv: derivedParams.iv };
const encrypted = crypto.lib.SerializableCipher.encrypt(
  crypto.algo.Blowfish,
  message,
  derivedParams.key,
  cfg
);

console.log('Encrypted:', encrypted);
console.log('  ciphertext:', encrypted.ciphertext ? encrypted.ciphertext.toString() : 'undefined');

// Mix in derived params
encrypted.mixIn(derivedParams);
console.log('After mixIn:');
console.log('  salt:', encrypted.salt ? encrypted.salt.toString() : 'undefined');
console.log('  ciphertext:', encrypted.ciphertext ? encrypted.ciphertext.toString() : 'undefined');
