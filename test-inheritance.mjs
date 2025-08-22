import { Cipher, BlockCipher } from './dist/cipher-core.mjs';
import { WordArray } from './dist/core.mjs';

// Create a simple test cipher
class TestCipher extends BlockCipher {
  _doResetCalled = false;
  
  _doReset() {
    console.log('TestCipher._doReset() called');
    this._doResetCalled = true;
  }
  
  encryptBlock(words, offset) {
    console.log('TestCipher.encryptBlock()');
  }
  
  decryptBlock(words, offset) {
    console.log('TestCipher.decryptBlock()');
  }
  
  _doFinalize() {
    console.log('TestCipher._doFinalize()');
    return new WordArray();
  }
}

const key = WordArray.create([0x00010203, 0x04050607]);

console.log('Creating TestCipher instance...');
const cipher = new TestCipher(1, key);

console.log('After constructor:');
console.log('  _doResetCalled:', cipher._doResetCalled);

console.log('\nCalling reset manually:');
cipher.reset();
console.log('After manual reset:');
console.log('  _doResetCalled:', cipher._doResetCalled);
