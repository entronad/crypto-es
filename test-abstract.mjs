// Test if abstract methods work correctly

class Base {
  constructor() {
    console.log('Base constructor');
    this.init();
  }
  
  init() {
    console.log('Base.init() calling doInit()');
    this.doInit();
  }
  
  doInit() {
    console.log('Base.doInit() - should be overridden');
  }
}

class Child extends Base {
  constructor() {
    super();
    console.log('Child constructor');
  }
  
  doInit() {
    console.log('Child.doInit() - overridden');
  }
}

console.log('Creating Child instance:');
const child = new Child();
console.log('\nCalling init manually:');
child.init();
