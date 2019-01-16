/* eslint-disable no-undef */
import C from '../src/index.js';

describe('md5', () => {
  it('vector 1', () => {
    expect(C.MD5('').toString()).toBe('d41d8cd98f00b204e9800998ecf8427e');
  });
});
