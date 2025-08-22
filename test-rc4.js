import { RC4Algo } from './dist/rc4.mjs';
import { WordArray } from './dist/core.mjs';

console.log('Testing RC4...');

try {
  const key = WordArray.create([0x01234567, 0x89abcdef]);
  const algo = new RC4Algo(1, key); // 1 = encryption mode
  
  console.log('RC4Algo created');
  console.log('_S:', algo._S);
  console.log('_i:', algo._i);
  console.log('_j:', algo._j);
  
  const plaintext = WordArray.create([0x00000000, 0x00000000]);
  const result = algo.finalize(plaintext);
  
  console.log('Result:', result.toString());
} catch (e) {
  console.error('Error:', e.message);
  console.error('Stack:', e.stack);
}