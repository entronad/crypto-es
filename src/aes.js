import {
  BlockCipher,
} from './cipher-core';

// Lookup tables
const SBOX = [];
const INV_SBOX = [];
const SUB_MIX_0 = [];
const SUB_MIX_1 = [];
const SUB_MIX_2 = [];
const SUB_MIX_3 = [];
const INV_SUB_MIX_0 = [];
const INV_SUB_MIX_1 = [];
const INV_SUB_MIX_2 = [];
const INV_SUB_MIX_3 = [];

// Compute lookup tables

// Compute double table
const d = [];
for (let i = 0; i < 256; i += 1) {
  if (i < 128) {
    d[i] = i << 1;
  } else {
    d[i] = (i << 1) ^ 0x11b;
  }
}

// Walk GF(2^8)
let x = 0;
let xi = 0;
for (let i = 0; i < 256; i += 1) {
  // Compute sbox
  let sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
  sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
  SBOX[x] = sx;
  INV_SBOX[sx] = x;

  // Compute multiplication
  const x2 = d[x];
  const x4 = d[x2];
  const x8 = d[x4];

  // Compute sub bytes, mix columns tables
  let t = (d[sx] * 0x101) ^ (sx * 0x1010100);
  SUB_MIX_0[x] = (t << 24) | (t >>> 8);
  SUB_MIX_1[x] = (t << 16) | (t >>> 16);
  SUB_MIX_2[x] = (t << 8) | (t >>> 24);
  SUB_MIX_3[x] = t;

  // Compute inv sub bytes, inv mix columns tables
  t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
  INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
  INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
  INV_SUB_MIX_2[sx] = (t << 8) | (t >>> 24);
  INV_SUB_MIX_3[sx] = t;

  // Compute next counter
  if (!x) {
    xi = 1;
    x = xi;
  } else {
    x = x2 ^ d[d[d[x8 ^ x2]]];
    xi ^= d[d[xi]];
  }
}

// Precomputed Rcon lookup
const RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

/**
 * AES block cipher algorithm.
 */
export class AES extends BlockCipher {
  constructor() {
    super();

    this.keySize = 256 / 32;
  }

  _doReset() {
    let t;

    // Skip reset of nRounds has been set before and key did not change
    if (this._nRounds && this._keyPriorReset === this._key) {
      return;
    }

    // Shortcuts
    this._keyPriorReset = this._key;
    const key = this._keyPriorReset;
    const keyWords = key.words;
    const keySize = key.sigBytes / 4;

    // Compute number of rounds
    this._nRounds = keySize + 6;
    const nRounds = this._nRounds;

    // Compute number of key schedule rows
    const ksRows = (nRounds + 1) * 4;

    // Compute key schedule
    this._keySchedule = [];
    const keySchedule = this._keySchedule;
    for (let ksRow = 0; ksRow < ksRows; ksRow += 1) {
      if (ksRow < keySize) {
        keySchedule[ksRow] = keyWords[ksRow];
      } else {
        t = keySchedule[ksRow - 1];

        if (!(ksRow % keySize)) {
          // Rot word
          t = (t << 8) | (t >>> 24);

          // Sub word
          t = (SBOX[t >>> 24] << 24)
            | (SBOX[(t >>> 16) & 0xff] << 16)
            | (SBOX[(t >>> 8) & 0xff] << 8)
            | SBOX[t & 0xff];

          // Mix Rcon
          t ^= RCON[(ksRow / keySize) | 0] << 24;
        } else if (keySize > 6 && ksRow % keySize === 4) {
          // Sub word
          t = (SBOX[t >>> 24] << 24)
            | (SBOX[(t >>> 16) & 0xff] << 16)
            | (SBOX[(t >>> 8) & 0xff] << 8)
            | SBOX[t & 0xff];
        }

        keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
      }
    }

    // Compute inv key schedule
    this._invKeySchedule = [];
    const invKeySchedule = this._invKeySchedule;
    for (let invKsRow = 0; invKsRow < ksRows; invKsRow += 1) {
      const ksRow = ksRows - invKsRow;

      if (invKsRow % 4) {
        t = keySchedule[ksRow];
      } else {
        t = keySchedule[ksRow - 4];
      }

      if (invKsRow < 4 || ksRow <= 4) {
        invKeySchedule[invKsRow] = t;
      } else {
        invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]]
          ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]]
          ^ INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]]
          ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
      }
    }
  }

  encryptBlock(M, offset) {
    this._doCryptBlock(
      M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX,
    );
  }

  decryptBlock(M, offset) {
    const _M = M;

    // Swap 2nd and 4th rows
    let t = M[offset + 1];
    _M[offset + 1] = _M[offset + 3];
    _M[offset + 3] = t;

    this._doCryptBlock(
      M,
      offset,
      this._invKeySchedule,
      INV_SUB_MIX_0,
      INV_SUB_MIX_1,
      INV_SUB_MIX_2,
      INV_SUB_MIX_3,
      INV_SBOX,
    );

    // Inv swap 2nd and 4th rows
    t = M[offset + 1];
    _M[offset + 1] = M[offset + 3];
    _M[offset + 3] = t;
  }

  _doCryptBlock(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
    // Shortcut
    var nRounds = this._nRounds;

    // Get input, add round key
    var s0 = M[offset]     ^ keySchedule[0];
    var s1 = M[offset + 1] ^ keySchedule[1];
    var s2 = M[offset + 2] ^ keySchedule[2];
    var s3 = M[offset + 3] ^ keySchedule[3];

    // Key schedule row counter
    var ksRow = 4;

    // Rounds
    for (var round = 1; round < nRounds; round++) {
        // Shift rows, sub bytes, mix columns, add round key
        var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
        var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
        var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
        var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

        // Update state
        s0 = t0;
        s1 = t1;
        s2 = t2;
        s3 = t3;
    }

    // Shift rows, sub bytes, add round key
    var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
    var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
    var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
    var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

    // Set output
    M[offset]     = t0;
    M[offset + 1] = t1;
    M[offset + 2] = t2;
    M[offset + 3] = t3;
  }
}
