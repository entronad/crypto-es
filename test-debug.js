import C from './dist/index.mjs';

console.log('Testing MD5...');
const md5Result = C.MD5('').toString();
console.log('MD5(""):', md5Result);
console.log('Expected:', 'd41d8cd98f00b204e9800998ecf8427e');
console.log('Match:', md5Result === 'd41d8cd98f00b204e9800998ecf8427e');

console.log('\nTesting SHA256...');
const sha256Result = C.SHA256('').toString();
console.log('SHA256(""):', sha256Result);
console.log('Expected:', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
console.log('Match:', sha256Result === 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

console.log('\nTesting AES...');
try {
  const message = 'Message';
  const passphrase = 'Secret Passphrase';
  const encrypted = C.AES.encrypt(message, passphrase);
  const decrypted = C.AES.decrypt(encrypted, passphrase);
  console.log('AES Encrypt/Decrypt:', decrypted.toString(C.enc.Utf8));
  console.log('Match:', decrypted.toString(C.enc.Utf8) === message);
} catch (e) {
  console.error('AES Error:', e.message);
}

console.log('\nTesting RC4...');
try {
  const rc4Key = C.enc.Hex.parse('0123456789abcdef');
  const rc4Plaintext = C.enc.Hex.parse('0000000000000000');
  const rc4Encrypted = C.RC4.encrypt(rc4Plaintext, rc4Key);
  console.log('RC4 result:', rc4Encrypted.ciphertext.toString());
} catch (e) {
  console.error('RC4 Error:', e.message);
  console.error(e.stack);
}