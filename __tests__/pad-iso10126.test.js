/* eslint-disable no-undef */
import C from '../src/index.js';

const _data = {};

beforeAll(() => {
  // Save original random method
  _data.random = C.lib.WordArray.random;

  // Replace random method with one that returns a predictable value
  C.lib.WordArray.random = (nBytes) => {
    const words = [];
    for (let i = 0; i < nBytes; i += 4) {
      words.push([0x11223344]);
    }

    return C.lib.WordArray.create(words, nBytes);
  };
});

afterAll(() => {
  // Restore random method
  C.lib.WordArray.random = _data.random;
});

describe('pad-iso10126', () => {
  it('pad', () => {
    const data = C.lib.WordArray.create([0xdddddd00], 3);
    C.pad.Iso10126.pad(data, 2);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd11, 0x22334405]).toString());
  });

  it('pad clamp', () => {
    const data = C.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
    C.pad.Iso10126.pad(data, 2);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd11, 0x22334405]).toString());
  });

  it('unpad', () => {
    const data = C.lib.WordArray.create([0xdddddd11, 0x22334405]);
    C.pad.Iso10126.unpad(data);

    expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd00], 3).toString());
  });
});
