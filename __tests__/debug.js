import C from '../lib/index.js';

const data = {};
data.saltA = C.enc.Hex.parse('AA00000000000000');
const encryptedA = C.Blowfish.encrypt('Test', 'pass', { salt: data.saltA, hasher: C.algo.SHA256 }).toString();
console.log(encryptedA);