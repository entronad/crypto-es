/* eslint-disable no-undef */
import { AnsiX923, WordArray } from '../src/index';

describe('pad-ansix923', () => {
  it('pad', () => {
    const data = WordArray.create([0xdddddd00], 3);
    AnsiX923.pad(data, 2);

    expect(data.toString()).toBe(WordArray.create([0xdddddd00, 0x00000005]).toString());
  });

  it('pad clamp', () => {
    const data = WordArray.create([0xdddddddd, 0xdddddddd], 3);
    AnsiX923.pad(data, 2);

    expect(data.toString()).toBe(WordArray.create([0xdddddd00, 0x00000005]).toString());
  });

  it('unpad', () => {
    const data = WordArray.create([0xdddddd00, 0x00000005]);
    AnsiX923.unpad(data);

    expect(data.toString()).toBe(WordArray.create([0xdddddd00], 3).toString());
  });
});
