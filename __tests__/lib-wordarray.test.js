/* eslint-disable no-undef */
import C from '../src/index.js';

describe('lib-wordarray', () => {
  it('init 0', () => {
    expect(C.lib.WordArray.create().toString()).toBe('');
  });

  it('init 1', () => {
    expect(C.lib.WordArray.create([0x12345678]).toString()).toBe('12345678');
  });

  it('init 2', () => {
    expect(C.lib.WordArray.create([0x12345678], 2).toString()).toBe('1234');
  });

  it('toString passed encoder', () => {
    expect(C.lib.WordArray.create([0x12345678]).toString(C.enc.Latin1)).toBe('\x12\x34\x56\x78');
  });

  it('toString default encoder', () => {
    expect(C.lib.WordArray.create([0x12345678]).toString()).toBe('12345678');
  });

  it('concat 3', () => {
    const wordArray1 = C.lib.WordArray.create([0x12345678], 3);
    const wordArray2 = C.lib.WordArray.create([0x12345678], 3);

    expect(wordArray1.concat(wordArray2).toString()).toBe('123456123456');
    expect(wordArray1.toString()).toBe('123456123456');
  });

  it('concat 4', () => {
    const wordArray1 = C.lib.WordArray.create([0x12345678], 4);
    const wordArray2 = C.lib.WordArray.create([0x12345678], 3);

    expect(wordArray1.concat(wordArray2).toString()).toBe('12345678123456');
    expect(wordArray1.toString()).toBe('12345678123456');
  });

  it('concat 5', () => {
    const wordArray1 = C.lib.WordArray.create([0x12345678], 5);
    const wordArray2 = C.lib.WordArray.create([0x12345678], 3);

    expect(wordArray1.concat(wordArray2).toString()).toBe('1234567800123456');
    expect(wordArray1.toString()).toBe('1234567800123456');
  });

  it('concat long', () => {
    const wordArray1 = C.lib.WordArray.create();

    const wordArray2 = C.lib.WordArray.create();
    const wordArray3 = C.lib.WordArray.create();
    for (let i = 0; i < 500000; i += 1) {
      wordArray2.words[i] = i;
      wordArray3.words[i] = i;
    }
    wordArray2.sigBytes = 500000;
    wordArray3.sigBytes = 500000;

    const target = wordArray2.toString() + wordArray3.toString();
    expect(wordArray1.concat(wordArray2.concat(wordArray3)).toString())
      .toBe(target);
  });

  it('clamp', () => {
    const wordArray = C.lib.WordArray.create([0x12345678, 0x12345678], 3);
    wordArray.clamp();

    expect(wordArray.words.toString()).toBe([0x12345600].toString());
  });

  it('clone', () => {
    const wordArray = C.lib.WordArray.create([0x12345678]);
    const clone = wordArray.clone();
    clone.words[0] = 0;

    expect(clone.toString()).not.toBe(wordArray.toString());
  });

  it('random', () => {
    expect(C.lib.WordArray.random(8).toString()).not.toBe(C.lib.WordArray.random(8).toString());
    expect(C.lib.WordArray.random(8).sigBytes).toBe(8);
  });
});
