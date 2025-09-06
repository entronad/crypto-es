/* eslint-disable no-undef */
import { X64Word } from '../src/index';

describe('x64-word', () => {
  it('init', () => {
    const word = X64Word.create(0x00010203, 0x04050607);
    expect(word.high).toBe(0x00010203);
    expect(word.low).toBe(0x04050607);
  });
});
