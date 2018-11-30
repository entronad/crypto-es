使用jest单元测试

调查TypedArray使用情况

用class语法改写对象与继承



仅使用进入标准的特性

成员变量系列尚未进入标准，不是用



Base.create()其实就是构造函数，但为了保持API不变，保留此函数

> constructor返回的是实例，但constructor属于实例而不是类；静态方法的this指的是类而不是实例，可通过new this返回实例；子类继承后，成员方法this指子实例，静态方法this指子类

采用静态方法的办法处理Base，保持API不变



clone:

1 保留类信息：通过具有相同的constructor表征

2 实例拷贝

思路：

使之具有相同的构造函数、原型对象

为了保证函数实现的代码与当前类名无关，尽量从实例获取类名（构造函数），使用inst.constructor

原先想用Object.create()，但这样不会执行构造方法

改用new this.constructor()再挂载枚举属性的办法



先照着实现，再考虑TypedArray



init就是构造函数，也不需要了



Hasher 中的 cfg，cfg是base的对象，传入的普通对象能混入

所以采用先建个base对象，再assign传入的cfg



_createHelper传入的应该是一个类

