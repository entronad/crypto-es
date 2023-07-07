/* eslint-disable no-undef */
import C from '../lib/index.js';

const data = {};

beforeAll(() => {
  data.buffer = new ArrayBuffer(8);

  const uint8View = new Uint8Array(data.buffer);
  uint8View[0] = 0x01;
  uint8View[1] = 0x23;
  uint8View[2] = 0x45;
  uint8View[3] = 0x67;
  uint8View[4] = 0x89;
  uint8View[5] = 0xab;
  uint8View[6] = 0xcd;
  uint8View[7] = 0xef;
});

describe('lib-typedarrays-test', () => {
  it('Int8Array', () => {
    expect(C.lib.WordArray.create(new Int8Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  it('Uint8Array', () => {
    expect(C.lib.WordArray.create(new Uint8Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  it('Uint8ClampedArray', () => {
    expect(C.lib.WordArray.create(new Uint8ClampedArray(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  it('Int16Array', () => {
    expect(C.lib.WordArray.create(new Int16Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  it('Uint16Array', () => {
    expect(C.lib.WordArray.create(new Uint16Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  it('Int32Array', () => {
    expect(C.lib.WordArray.create(new Int32Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  it('Uint32Array', () => {
    expect(C.lib.WordArray.create(new Uint32Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  it('Int16Array', () => {
    expect(C.lib.WordArray.create(new Int16Array(data.buffer, 2, 2)).toString()).toBe('456789ab');
  });
});
