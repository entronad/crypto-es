/* eslint-disable no-undef */
import { Iso10126, WordArray } from '../src/index';

const _data: any = {};

beforeAll(() => {
  // Save original random method
  _data.random = WordArray.random;

  // Replace random method with one that returns a predictable value
  WordArray.random = (nBytes) => {
    const words: number[] = [];
    for (let i = 0; i < nBytes; i += 4) {
      words.push(0x11223344);
    }

    return WordArray.create(words, nBytes);
  };
});

afterAll(() => {
  // Restore random method
  WordArray.random = _data.random;
});

describe('pad-iso10126', () => {
  it('pad', () => {
    const data = WordArray.create([0xdddddd00], 3);
    Iso10126.pad(data, 2);

    expect(data.toString()).toBe(WordArray.create([0xdddddd11, 0x22334405]).toString());
  });

  it('pad clamp', () => {
    const data = WordArray.create([0xdddddddd, 0xdddddddd], 3);
    Iso10126.pad(data, 2);

    expect(data.toString()).toBe(WordArray.create([0xdddddd11, 0x22334405]).toString());
  });

  it('unpad', () => {
    const data = WordArray.create([0xdddddd11, 0x22334405]);
    Iso10126.unpad(data);

    expect(data.toString()).toBe(WordArray.create([0xdddddd00], 3).toString());
  });
});
