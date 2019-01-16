/* eslint-disable no-undef */
import C from '../src/index.js';

describe('sha3', () => {
  it('vector 1', () => {
    expect(C.SHA3('', { outputLength: 512 }).toString())
      .toBe('0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e');
  });

  it('vector 2', () => {
    expect(C.SHA3(C.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), { outputLength: 512 }).toString())
      .toBe('81950e7096d31d4f22e3db71cac725bf59e81af54c7ca9e6aeee71c010fc5467466312a01aa5c137cfb140646941556796f612c9351268737c7e9a2b9631d1fa');
  });

  it('vector 3', () => {
    expect(C.SHA3('', { outputLength: 384 }).toString())
      .toBe('2c23146a63a29acf99e73b88f8c24eaa7dc60aa771780ccc006afbfa8fe2479b2dd2b21362337441ac12b515911957ff');
  });

  it('vector 4', () => {
    expect(C.SHA3(C.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), { outputLength: 384 }).toString())
      .toBe('6bff1c8405a3fe594e360e3bccea1ebcd509310dc79b9e45c263783d7a5dd662c6789b18bd567dbdda1554f5bee6a860');
  });

  it('vector 5', () => {
    expect(C.SHA3('', { outputLength: 256 }).toString())
      .toBe('c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470');
  });

  it('vector 6', () => {
    expect(C.SHA3(C.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), { outputLength: 256 }).toString())
      .toBe('348fb774adc970a16b1105669442625e6adaa8257a89effdb5a802f161b862ea');
  });

  it('vector 7', () => {
    expect(C.SHA3('', { outputLength: 224 }).toString())
      .toBe('f71837502ba8e10837bdd8d365adb85591895602fc552b48b7390abd');
  });

  it('vector 8', () => {
    expect(C.SHA3(C.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), { outputLength: 224 }).toString())
      .toBe('5af56987ea9cf11fcd0eac5ebc14b037365e9b1123e31cb2dfc7929a');
  });

  it('default output length', () => {
    expect(C.SHA3('').toString())
      .toBe('0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e');
  });

  it('clone', () => {
    const sha3 = C.algo.SHA3.create();

    expect(sha3.update('a').clone().finalize().toString()).toBe(C.SHA3('a').toString());
    expect(sha3.update('b').clone().finalize().toString()).toBe(C.SHA3('ab').toString());
    expect(sha3.update('c').clone().finalize().toString()).toBe(C.SHA3('abc').toString());
  });

  it('input integrity', () => {
    const message = C.lib.WordArray.create([0x12345678]);

    const expected = message.toString();

    C.SHA3(message);

    expect(message.toString()).toBe(expected);
  });

  it('helper', () => {
    expect(C.SHA3('', { outputLength: 256 }).toString())
      .toBe(C.algo.SHA3.create({ outputLength: 256 }).finalize('').toString());
  });

  it('hmacHelper', () => {
    expect(C.HmacSHA3('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
      .toBe(C.algo.HMAC.create(C.algo.SHA3, C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).finalize('Hi There').toString());
  });
});
