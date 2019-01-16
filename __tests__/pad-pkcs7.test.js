/* eslint-disable no-undef */
import C from '../src/index.js';

describe('pad-pkcs7', () => {
  it('pad', () => {
    const data = C.lib.WordArray.create([0xdddddd00], 3);
    C.pad.Pkcs7.pad(data, 2);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd05, 0x05050505]).toString());
  });

  it('pad clamp', () => {
    const data = C.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
    C.pad.Pkcs7.pad(data, 2);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd05, 0x05050505]).toString());
  });

  it('unpad', () => {
    const data = C.lib.WordArray.create([0xdddddd05, 0x05050505]);
    C.pad.Pkcs7.unpad(data);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd00], 3).toString());
  });
});
