import Crypto from '../lib/index.js';

function decryptDES(encrypted, keyString) {
  const ciphertext = Crypto.enc.Hex.parse(encrypted);
  const key = Crypto.enc.Utf8.parse(keyString);

  const decrypted = Crypto.DES.decrypt(
    {
      ciphertext
    },
    key,
    {
      mode: Crypto.mode.ECB,
      padding: Crypto.pad.NoPadding
    }
  );

  // CryptoES: Malformed UTF-8 data
  // https://codesandbox.io/s/cryptoes-des-decryption-zt4cs
  return decrypted.toString(Crypto.enc.Utf8);
}

const data = [
  "1;8D709DF37DD0F75702B98B13B48CCAC989421B49",
  "1;B6C052F5259BC340C489A1C391BFCB67AFDC7D1B",
  "1;65CE64E708401E956DF015E0BB9BE238B22AC4DD",
  "1;761F348ACE19C9C6B7EFAB062B737950C71C5B48",
  "1;38ADD29F4F24AEDE6D45A35A46DD5BD36E1DE3EA",
  "1;29810AD241B5293ABA4E04B79F7C9C960AD4D779",
  "1;965909504145BFEF3B5FDB01FD0B086787B1CC48",
  "1;1CFFF0630506B58C9254D3F0DB59561A8DFD37C7",
  "1;717A70C67008B436A6EFA38C2182C8BCF04E3C53",
  "1;1348011174AD38961DD969DAEF75D5920CC91403"
];

const result = data.map((d) => {
  const [, string] = d.split(";");
  const keyLength = 8;
  const key = string.slice(0, keyLength);
  const hexString = string.slice(keyLength);
  return decryptDES(hexString, key).replace(/\0/g, "");
});

console.log(result);
