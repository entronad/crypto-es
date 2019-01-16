/* eslint-disable no-undef */
import C from '../src/index.js';

describe('x64-word', () => {
  it('init', () => {
    const word = C.x64.Word.create(0x00010203, 0x04050607);
    expect(word.high).toBe(0x00010203);
    expect(word.low).toBe(0x04050607);
  });
});
