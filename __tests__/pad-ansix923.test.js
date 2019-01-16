/* eslint-disable no-undef */
import C from '../src/index.js';

describe('pad-ansix923', () => {
  it('pad', () => {
    const data = C.lib.WordArray.create([0xdddddd00], 3);
    C.pad.AnsiX923.pad(data, 2);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd00, 0x00000005]).toString());
  });

  it('pad clamp', () => {
    const data = C.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
    C.pad.AnsiX923.pad(data, 2);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd00, 0x00000005]).toString());
  });

  it('unpad', () => {
    const data = C.lib.WordArray.create([0xdddddd00, 0x00000005]);
    C.pad.AnsiX923.unpad(data);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd00], 3).toString());
  });
});
