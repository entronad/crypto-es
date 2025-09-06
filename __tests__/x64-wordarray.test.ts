/* eslint-disable no-undef */
import { X64Word, X64WordArray } from '../src/index';

describe('x64-wordarray', () => {
  it('init 0', () => {
    expect(X64WordArray.create().toX32().toString()).toBe('');
  });

  it('init 1', () => {
    const wordArray = X64WordArray.create([
      X64Word.create(0x00010203, 0x04050607),
      X64Word.create(0x18191a1b, 0x1c1d1e1f),
    ]);

    expect(wordArray.toX32().toString()).toBe('000102030405060718191a1b1c1d1e1f');
  });

  it('init 2', () => {
    const wordArray = X64WordArray.create([
      X64Word.create(0x00010203, 0x04050607),
      X64Word.create(0x18191a1b, 0x1c1d1e1f),
    ], 10);

    expect(wordArray.toX32().toString()).toBe('00010203040506071819');
  });

  it('to x32', () => {
    const wordArray = X64WordArray.create([
      X64Word.create(0x00010203, 0x04050607),
      X64Word.create(0x18191a1b, 0x1c1d1e1f),
    ], 10);

    expect(wordArray.toX32().toString()).toBe('00010203040506071819');
  });
});
