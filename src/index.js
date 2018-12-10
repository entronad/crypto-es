import {
  Base,
  WordArray,
  Hex,
  Latin1,
  Utf8,
  BufferedBlockAlgorithm,
  Hasher,
} from './core';

import {
  X64Word,
  X64WordArray,
} from './x64-core';

export default {
  lib: {
    Base,
    WordArray,
    BufferedBlockAlgorithm,
    Hasher,
  },
  x64: {
    Word: X64Word,
    WordArray: X64WordArray,
  },
  enc: {
    Hex,
    Latin1,
    Utf8,
  },
};
