import CryptoES from '../lib';

import { MD5 } from '../lib/md5';

import { AES } from '../lib/aes';

const t1: CryptoES.lib.Base = new CryptoES.lib.Base();

const t2: CryptoES.lib.StreamCipher = new CryptoES.lib.StreamCipher();

const t3: CryptoES.lib.CipherParams = CryptoES.lib.PasswordBasedCipher.encrypt(CryptoES.algo.AES, 'message', 'password', { format: CryptoES.format.OpenSSL });

const t4: CryptoES.x64.WordArray = new CryptoES.x64.WordArray();

const t5: CryptoES.algo.HMAC = new CryptoES.algo.HMAC();

const t6 = CryptoES.lib.PasswordBasedCipher._parse();

const t7 = MD5('message');

const t8 = AES.encrypt("Message", "Secret Passphrase");
