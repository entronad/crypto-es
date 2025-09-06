/* eslint-disable no-undef */
import { MD5 } from '../src/index';

describe('md5', () => {
  it('vector 1', () => {
    expect(MD5('').toString()).toBe('d41d8cd98f00b204e9800998ecf8427e');
  });
});
