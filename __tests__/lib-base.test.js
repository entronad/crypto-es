/* eslint-disable no-undef */
import Crypto from '../src';

const data = {};

beforeAll(() => {
  data.mixins = {
    mixinMethod: () => {},
  };

  data.Obj = class Obj extends Crypto.lib.Base {
    constructor(arg) {
      super();
      this.initFired = true;
      this.initArg = arg;
    }

    toString() {
    }
  };

  data.obj = data.Obj.create('argValue');

  data.obj.mixIn(data.mixins);

  data.objClone = this.data.obj.clone();
});

describe('lib-base', () => {
  it('extend super', () => {
    expect(Crypto.lib.Base).toBe(data.Obj.super);
  });
});
