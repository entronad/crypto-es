import C from '../lib/index.js';

const data = {};

data.buffer = new ArrayBuffer(8);

const uint8View = new Uint8Array(data.buffer);
uint8View[0] = 0x01;
uint8View[1] = 0x23;
uint8View[2] = 0x45;
uint8View[3] = 0x67;
uint8View[4] = 0x89;
uint8View[5] = 0xab;
uint8View[6] = 0xcd;
uint8View[7] = 0xef;

const wordArray = C.lib.WordArray.create(data.buffer);

console.log('Resault: ', C.AES.encrypt(wordArray, 'Secret Passphrase'));


export function aesEncrypt(word, keyWord = "XwKsGlMcdPMEhR1B") {
  var key = C.enc.Utf8.parse(keyWord);
  var srcs = C.enc.Utf8.parse(word);
  var encrypted = C.AES.encrypt(srcs, key, {
  mode: C.mode.ECB,
  padding: C.pad.Pkcs7,
  });
  return encrypted.toString();
}

console.log(aesEncrypt('aaa'));
