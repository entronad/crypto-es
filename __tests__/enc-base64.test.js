/* eslint-disable no-undef */
import C from '../src/index.js';

describe('enc-base64', () => {
  it('stringify 0', () => {
    expect(C.enc.Base64.stringify(C.lib.WordArray.create([0x666f6f62, 0x61720000], 0))).toBe('');
  });

  it('stringify 1', () => {
    expect(C.enc.Base64.stringify(C.lib.WordArray.create([0x666f6f62, 0x61720000], 1))).toBe('Zg==');
  });

  it('stringify 2', () => {
    expect(C.enc.Base64.stringify(C.lib.WordArray.create([0x666f6f62, 0x61720000], 2))).toBe('Zm8=');
  });

  it('stringify 3', () => {
    expect(C.enc.Base64.stringify(C.lib.WordArray.create([0x666f6f62, 0x61720000], 3))).toBe('Zm9v');
  });

  it('stringify 4', () => {
    expect(C.enc.Base64.stringify(C.lib.WordArray.create([0x666f6f62, 0x61720000], 4))).toBe('Zm9vYg==');
  });

  it('stringify 5', () => {
    expect(C.enc.Base64.stringify(C.lib.WordArray.create([0x666f6f62, 0x61720000], 5))).toBe('Zm9vYmE=');
  });

  it('stringify 6', () => {
    expect(C.enc.Base64.stringify(C.lib.WordArray.create([0x666f6f62, 0x61720000], 6))).toBe('Zm9vYmFy');
  });

  it('stringify 15', () => {
    expect(C.enc.Base64.stringify(C.lib.WordArray.create([0x3e3e3e3f, 0x3f3f3e3e, 0x3e3f3f3f, 0x3d2f2b00], 15))).toBe('Pj4+Pz8/Pj4+Pz8/PS8r');
  });

  it('parse 0', () => {
    expect(C.enc.Base64.parse('').toString()).toBe(C.lib.WordArray.create([0x666f6f62, 0x61720000], 0).toString());
  });

  it('parse 1', () => {
    expect(C.enc.Base64.parse('Zg==').toString()).toBe(C.lib.WordArray.create([0x666f6f62, 0x61720000], 1).toString());
  });

  it('parse 2', () => {
    expect(C.enc.Base64.parse('Zm8=').toString()).toBe(C.lib.WordArray.create([0x666f6f62, 0x61720000], 2).toString());
  });

  it('parse 3', () => {
    expect(C.enc.Base64.parse('Zm9v').toString()).toBe(C.lib.WordArray.create([0x666f6f62, 0x61720000], 3).toString());
  });

  it('parse 4', () => {
    expect(C.enc.Base64.parse('Zm9vYg==').toString()).toBe(C.lib.WordArray.create([0x666f6f62, 0x61720000], 4).toString());
  });

  it('parse 5', () => {
    expect(C.enc.Base64.parse('Zm9vYmE=').toString()).toBe(C.lib.WordArray.create([0x666f6f62, 0x61720000], 5).toString());
  });

  it('parse 6', () => {
    expect(C.enc.Base64.parse('Zm9vYmFy').toString()).toBe(C.lib.WordArray.create([0x666f6f62, 0x61720000], 6).toString());
  });

  it('parse 15', () => {
    expect(C.enc.Base64.parse('Pj4+Pz8/Pj4+Pz8/PS8r').toString()).toBe(C.lib.WordArray.create([0x3e3e3e3f, 0x3f3f3e3e, 0x3e3f3f3f, 0x3d2f2b00], 15).toString());
  });
});
