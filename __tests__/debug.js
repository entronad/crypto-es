import C from '../src/index.js';

console.log('Resault: ', C.AES.encrypt(C.enc.Hex.parse('00112233445566778899aabbccddeeff'), C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'), { mode: C.mode.ECB, padding: C.pad.NoPadding }).ciphertext.toString());
