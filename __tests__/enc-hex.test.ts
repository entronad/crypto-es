/* eslint-disable no-undef */
import { Hex, WordArray } from '../src/index';

describe('enc-hex', () => {
  it('stringify', () => {
    expect(Hex.stringify(WordArray.create([0x12345678]))).toBe('12345678');
  });

  it('parse', () => {
    expect(Hex.parse('12345678').toString()).toBe(WordArray.create([0x12345678]).toString());
  });
});
