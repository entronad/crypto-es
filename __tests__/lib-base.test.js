/* eslint-disable no-undef */
import C from '../src/index.js';

const data = {};

beforeAll(() => {
  data.mixins = {
    mixinMethod: () => {},
  };

  data.Obj = class Obj extends C.lib.Base {
    constructor(arg) {
      super();
      this.initFired = true;
      this.initArg = arg;
    }

    toString() {
      return 'ObjToString';
    }
  };

  data.obj = data.Obj.create('argValue');

  data.obj.mixIn(data.mixins);

  data.objClone = data.obj.clone();
});

describe('lib-base', () => {
  it('class inheritance', () => {
    /* eslint-disable no-proto */
    expect(data.Obj.__proto__).toBe(C.lib.Base);
    /* eslint-enable no-proto */
  });

  it('object inheritance', () => {
    /* eslint-disable no-proto */
    expect(data.obj.__proto__.__proto__).toBe(C.lib.Base.prototype);
    /* eslint-enable no-proto */
  });

  it('override', () => {
    expect(data.obj.toString()).toBe('ObjToString');
  });

  it('create', () => {
    expect(data.obj.initFired).toBeTruthy();
    expect(data.obj.initArg).toBe('argValue');
  });

  it('create', () => {
    expect(data.obj.mixinMethod).toBe(data.mixins.mixinMethod);
  });

  it('clone distinct', () => {
    expect(data.objClone).not.toBe(data.obj);
  });

  it('clone copy', () => {
    expect(data.objClone.initArg).toBe(data.obj.initArg);
  });

  it('clone independent', () => {
    data.obj.initArg = 'newValue';
    expect(data.objClone.initArg).not.toBe(data.obj.initArg);
  });
});
