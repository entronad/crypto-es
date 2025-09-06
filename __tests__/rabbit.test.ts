/* eslint-disable no-undef */
import { ECB, Hex, NoPadding, PasswordBasedCipher, Rabbit, RabbitAlgo, SHA256, SerializableCipher, WordArray } from '../src/index';

describe('rabbit', () => {
  it('vector 1', () => {
    expect(Rabbit.encrypt(Hex.parse('00000000000000000000000000000000'), Hex.parse('00000000000000000000000000000000')).ciphertext!.toString())
      .toBe('02f74a1c26456bf5ecd6a536f05457b1');
  });

  it('vector 2', () => {
    expect(Rabbit.encrypt(Hex.parse('00000000000000000000000000000000'), Hex.parse('c21fcf3881cd5ee8628accb0a9890df8')).ciphertext!.toString())
      .toBe('3d02e0c730559112b473b790dee018df');
  });

  it('vector 3', () => {
    expect(Rabbit.encrypt(Hex.parse('00000000000000000000000000000000'), Hex.parse('1d272c6a2d8e3dfcac14056b78d633a0')).ciphertext!.toString())
      .toBe('a3a97abb80393820b7e50c4abb53823d');
  });

  it('vector 4', () => {
    expect(Rabbit.encrypt(Hex.parse('00000000000000000000000000000000'), Hex.parse('0053a6f94c9ff24598eb3e91e4378add'), { iv: Hex.parse('0d74db42a91077de') }).ciphertext!.toString())
      .toBe('75d186d6bc6905c64f1b2dfdd51f7bfc');
  });

  it('vector 5', () => {
    expect(Rabbit.encrypt(Hex.parse('00000000000000000000000000000000'), Hex.parse('0558abfe51a4f74a9df04396e93c8fe2'), { iv: Hex.parse('167de44bb21980e7') }).ciphertext!.toString())
      .toBe('476e2750c73856c93563b5f546f56a6a');
  });

  it('vector 6', () => {
    expect(Rabbit.encrypt(Hex.parse('00000000000000000000000000000000'), Hex.parse('0a5db00356a9fc4fa2f5489bee4194e7'), { iv: Hex.parse('1f86ed54bb2289f0') }).ciphertext!.toString())
      .toBe('921fcf4983891365a7dc901924b5e24b');
  });

  it('vector 7', () => {
    expect(Rabbit.encrypt(Hex.parse('00000000000000000000000000000000'), Hex.parse('0f62b5085bae0154a7fa4da0f34699ec'), { iv: Hex.parse('288ff65dc42b92f9') }).ciphertext!.toString())
      .toBe('613cb0ba96aff6cacf2a459a102a7f78');
  });

  it('multi part', () => {
    const rabbit = RabbitAlgo.createEncryptor(Hex.parse('00000000000000000000000000000000'));
    const ciphertext1 = rabbit.process(Hex.parse('000000000000'));
    const ciphertext2 = rabbit.process(Hex.parse('0000000000'));
    const ciphertext3 = rabbit.process(Hex.parse('0000000000'));
    const ciphertext4 = rabbit.finalize();

    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
      .toBe('02f74a1c26456bf5ecd6a536f05457b1');
  });

  it('input integrity', () => {
    const message = Hex.parse('00000000000000000000000000000000');
    const key = Hex.parse('00000000000000000000000000000000');
    const iv = Hex.parse('0000000000000000');

    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    const expectedIv = iv.toString();

    Rabbit.encrypt(message, key, { iv });

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
    expect(iv.toString()).toBe(expectedIv);
  });

  it('test helper', () => {
    // Save original random method
    const { random } = WordArray;

    // Replace random method with one that returns a predictable value
    WordArray.random = (nBytes) => {
      const words: number[] = [];
      for (let i = 0; i < nBytes; i += 4) {
        words.push(0x11223344);
      }

      return WordArray.create(words, nBytes);
    };

    expect(Rabbit.encrypt('Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).ciphertext!.toString())
      .toBe(RabbitAlgo.createEncryptor(SHA256('Jefe'), { mode: ECB, padding: NoPadding }).finalize('Hi There').toString());
    expect(Rabbit.encrypt('Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).toString())
      .toBe(SerializableCipher.encrypt(RabbitAlgo, 'Hi There', SHA256('Jefe'), { mode: ECB, padding: NoPadding }).toString());
    expect(Rabbit.encrypt('Hi There', 'Jefe', { mode: ECB, padding: NoPadding }).toString())
      .toBe(PasswordBasedCipher.encrypt(RabbitAlgo, 'Hi There', 'Jefe', { mode: ECB, padding: NoPadding }).toString());

    // Restore random method
    WordArray.random = random;
  });
});
