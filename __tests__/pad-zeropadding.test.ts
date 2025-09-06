/* eslint-disable no-undef */
import { WordArray, ZeroPadding } from '../src/index';

describe('pad-zeropadding', () => {
  it('pad', () => {
    const data = WordArray.create([0xdddddd00], 3);
    ZeroPadding.pad(data, 2);

    expect(data.toString()).toBe(WordArray.create([0xdddddd00, 0x00000000]).toString());
  });

  it('pad clamp', () => {
    const data = WordArray.create([0xdddddddd, 0xdddddddd], 3);
    ZeroPadding.pad(data, 2);

    expect(data.toString()).toBe(WordArray.create([0xdddddd00, 0x00000000]).toString());
  });

  it('unpad', () => {
    const data = WordArray.create([0xdddddd00, 0x00000000]);
    ZeroPadding.unpad(data);

    expect(data.toString()).toBe(WordArray.create([0xdddddd00], 3).toString());
  });
});
