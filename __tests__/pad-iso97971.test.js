/* eslint-disable no-undef */
import C from '../src/index.js';

describe('pad-iso97971', () => {
  it('pad 1', () => {
    const data = C.lib.WordArray.create([0xdddddd00], 3);
    C.pad.Iso97971.pad(data, 1);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd80]).toString());
  });

  it('pad 2', () => {
    const data = C.lib.WordArray.create([0xdddddd00], 3);
    C.pad.Iso97971.pad(data, 2);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd80, 0x00000000]).toString());
  });

  it('pad clamp', () => {
    const data = C.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
    C.pad.Iso97971.pad(data, 2);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd80, 0x00000000]).toString());
  });

  it('unpad', () => {
    const data = C.lib.WordArray.create([0xdddddd80, 0x00000000]);
    C.pad.Iso97971.unpad(data);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd00], 3).toString());
  });
});
