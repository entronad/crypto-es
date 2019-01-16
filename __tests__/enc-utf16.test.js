/* eslint-disable no-undef */
import C from '../src/index.js';

describe('enc-utf16', () => {
  it('stringify 1', () => {
    expect(C.enc.Utf16.stringify(C.lib.WordArray.create([0x007a0000], 2))).toBe('z');
  });

  it('stringify 2', () => {
    expect(C.enc.Utf16.stringify(C.lib.WordArray.create([0x6c340000], 2))).toBe('水');
  });

  it('stringify 3', () => {
    expect(C.enc.Utf16.stringify(C.lib.WordArray.create([0xd800dc00], 4))).toBe('𐀀');
  });

  it('stringify 4', () => {
    expect(C.enc.Utf16.stringify(C.lib.WordArray.create([0xd834dd1e], 4))).toBe('𝄞');
  });

  it('stringify 5', () => {
    expect(C.enc.Utf16.stringify(C.lib.WordArray.create([0xdbffdffd], 4))).toBe('􏿽');
  });

  it('stringify LE', () => {
    expect(C.enc.Utf16LE.stringify(C.lib.WordArray.create([0xffdbfddf], 4))).toBe('􏿽');
  });

  it('parse 1', () => {
    expect(C.enc.Utf16.parse('z').toString()).toBe(C.lib.WordArray.create([0x007a0000], 2).toString());
  });

  it('parse 2', () => {
    expect(C.enc.Utf16.parse('水').toString()).toBe(C.lib.WordArray.create([0x6c340000], 2).toString());
  });

  it('parse 3', () => {
    expect(C.enc.Utf16.parse('𐀀').toString()).toBe(C.lib.WordArray.create([0xd800dc00], 4).toString());
  });

  it('parse 4', () => {
    expect(C.enc.Utf16.parse('𝄞').toString()).toBe(C.lib.WordArray.create([0xd834dd1e], 4).toString());
  });

  it('parse 5', () => {
    expect(C.enc.Utf16.parse('􏿽').toString()).toBe(C.lib.WordArray.create([0xdbffdffd], 4).toString());
  });

  it('parse LE', () => {
    expect(C.enc.Utf16LE.parse('􏿽').toString()).toBe(C.lib.WordArray.create([0xffdbfddf], 4).toString());
  });
});
