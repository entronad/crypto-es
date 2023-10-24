import C from '../lib/index.js';

// const data = {};
// data.saltA = C.enc.Hex.parse('AA00000000000000');
// const encryptedA = C.Blowfish.encrypt('Test', 'pass', { salt: data.saltA, hasher: C.algo.SHA256 }).toString();
// console.log(encryptedA);

const start = (new Date()).getTime();
console.log(C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128 / 32}).toString());
const end = (new Date()).getTime();
console.log(end - start);
