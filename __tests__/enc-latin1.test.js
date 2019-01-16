/* eslint-disable no-undef */
import C from '../src/index.js';

describe('enc-latin1', () => {
  it('stringify', () => {
    expect(C.enc.Latin1.stringify(C.lib.WordArray.create([0x12345678]))).toBe('\x12\x34\x56\x78');
  });

  it('parse', () => {
    expect(C.enc.Latin1.parse('\x12\x34\x56\x78').toString()).toBe(C.lib.WordArray.create([0x12345678]).toString());
  });
});
