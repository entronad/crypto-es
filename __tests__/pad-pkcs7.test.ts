/* eslint-disable no-undef */
import { Pkcs7, WordArray } from '../src/index';

describe('pad-pkcs7', () => {
  it('pad', () => {
    const data = WordArray.create([0xdddddd00], 3);
    Pkcs7.pad(data, 2);

    expect(data.toString()).toBe(WordArray.create([0xdddddd05, 0x05050505]).toString());
  });

  it('pad clamp', () => {
    const data = WordArray.create([0xdddddddd, 0xdddddddd], 3);
    Pkcs7.pad(data, 2);

    expect(data.toString()).toBe(WordArray.create([0xdddddd05, 0x05050505]).toString());
  });

  it('unpad', () => {
    const data = WordArray.create([0xdddddd05, 0x05050505]);
    Pkcs7.unpad(data);

    expect(data.toString()).toBe(WordArray.create([0xdddddd00], 3).toString());
  });
});
