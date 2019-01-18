/* eslint-disable no-undef */
import C from '../src/index.js';

describe('ripemd160', () => {
  it('vector 1', () => {
    expect(C.RIPEMD160('The quick brown fox jumps over the lazy dog').toString())
      .toBe('37f332f68db77bd9d7edd4969571ad671cf9dd3b');
  });

  it('vector 2', () => {
    expect(C.RIPEMD160('The quick brown fox jumps over the lazy cog').toString())
      .toBe('132072df690933835eb8b6ad0b77e7b6f14acad7');
  });

  it('vector 3', () => {
    expect(C.RIPEMD160('').toString())
      .toBe('9c1185a5c5e9fc54612808977ee8f548b2258d31');
  });
});
