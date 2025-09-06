/* eslint-disable no-undef */
import { Iso97971, WordArray } from '../src/index';

describe('pad-iso97971', () => {
  it('pad 1', () => {
    const data = WordArray.create([0xdddddd00], 3);
    Iso97971.pad(data, 1);

    expect(data.toString()).toBe(WordArray.create([0xdddddd80]).toString());
  });

  it('pad 2', () => {
    const data = WordArray.create([0xdddddd00], 3);
    Iso97971.pad(data, 2);

    expect(data.toString()).toBe(WordArray.create([0xdddddd80, 0x00000000]).toString());
  });

  it('pad clamp', () => {
    const data = WordArray.create([0xdddddddd, 0xdddddddd], 3);
    Iso97971.pad(data, 2);

    expect(data.toString()).toBe(WordArray.create([0xdddddd80, 0x00000000]).toString());
  });

  it('unpad', () => {
    const data = WordArray.create([0xdddddd80, 0x00000000]);
    Iso97971.unpad(data);

    expect(data.toString()).toBe(WordArray.create([0xdddddd00], 3).toString());
  });
});
