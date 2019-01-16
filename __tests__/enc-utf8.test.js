/* eslint-disable no-undef */
import C from '../src/index.js';

describe('enc-utf8', () => {
  it('stringify 1', () => {
    expect(C.enc.Utf8.stringify(C.lib.WordArray.create([0x24000000], 1))).toBe('$');
  });

  it('stringify 2', () => {
    expect(C.enc.Utf8.stringify(C.lib.WordArray.create([0xc2a20000], 2))).toBe('¢');
  });

  it('stringify 3', () => {
    expect(C.enc.Utf8.stringify(C.lib.WordArray.create([0xe282ac00], 3))).toBe('€');
  });

  it('stringify 4', () => {
    expect(C.enc.Utf8.stringify(C.lib.WordArray.create([0xf0a4ada2], 4))).toBe('𤭢');
  });

  it('parse 1', () => {
    expect(C.enc.Utf8.parse('$').toString()).toBe(C.lib.WordArray.create([0x24000000], 1).toString());
  });

  it('parse 2', () => {
    expect(C.enc.Utf8.parse('¢').toString()).toBe(C.lib.WordArray.create([0xc2a20000], 2).toString());
  });

  it('parse 3', () => {
    expect(C.enc.Utf8.parse('€').toString()).toBe(C.lib.WordArray.create([0xe282ac00], 3).toString());
  });

  it('parse 4', () => {
    expect(C.enc.Utf8.parse('𤭢').toString()).toBe(C.lib.WordArray.create([0xf0a4ada2], 4).toString());
  });
});
