/* eslint-disable no-undef */
import C from '../src/index.js';

describe('enc-hex', () => {
  it('stringify', () => {
    expect(C.enc.Hex.stringify(C.lib.WordArray.create([0x12345678]))).toBe('12345678');
  });

  it('parse', () => {
    expect(C.enc.Hex.parse('12345678').toString()).toBe(C.lib.WordArray.create([0x12345678]).toString());
  });
});
