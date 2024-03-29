参考基线是 brix/crypto-js 3.1.9

使用jest单元测试

调查TypedArray使用情况

用class语法改写对象与继承

**模块**

为保持有多个输出和单个输出的引入方式一致，统一采用export



仅使用进入标准的特性

成员变量系列尚未进入标准，不是用



Base.create()，其实就是构造函数，但为了保持API不变，保留此函数

> constructor返回的是实例，但constructor属于实例而不是类；静态方法的this指的是类而不是实例，可通过new this返回实例；子类继承后，成员方法this指子实例，静态方法this指子类

采用静态方法的办法处理Base，保持API不变



Base.init() 也是构造函数的一部分，不再保留



mixIn还是需要的，省了Object.assign，仅在cipher中有使用，外部API中没有使用

测试中mixIn可以是类方法，但从实际使用中是实例方法，原来的架构中类和实例概念不清

好像可以实现中途给类添加方法，但这不是好的实践（其实mixIn也不是好的实践，反正动态类型）



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



内部结构采用modules的结构

由于jest中使用cjm，所以测试环境下使用一个@babel/plugin-transform-modules-commonjs统一转换成cjm



关于wordarray

一个word指一个32位有符号整数，等价于8个16进制数（4bit)或4个byte（8bit）【一个字节2个16进制数】

sigBytes 指前多少个byte有效，默认全有效，即array长度*4

clamp指只保留有效的byte

concat前会先clamp



_createHelper返回的不是构造函数，是Hasher的快捷方式，可以使用箭头函数

Hasher 通过_createHelper，结果为一个函数，输入文本，返回一个Wordarray （源码中称为hash）

_createHelper本身传入一个hasher，新建此hasher实例，并调用其finalize，因此finalize函数为实例函数，返回计算出的Wordarray

C.Hasher 是函数，C.algo.Hasher是类

Cipher. _createHelper中注意，对象的方法不用箭头函数



注意Cipher的构造函数有参数，所以所有子元素都需要传入参数



mode

基类BlockCipherMode，类方法createEncryptor和createDecryptor，返回Encryptor和Decryptor的实例，还有一个构造函数，供Encryptor和Decryptor继承

mode类比如CBC本身是空的，有Encryptor和Decryptor两个成语变量，CBC本身供两个成员变量继承

Encryptor和Decryptor都只有一个方法processBlock,它供BlockCipher的\_doProcessBlock使用：this.\_mode.processBlock(words, offset)

Cipher 的createEncryptor和Mode的createEncryptor是没有关系的



import语句中的省略后缀名与默认入口文件并不是语言标准，有争议，浏览器未实现，因此暂不使用



Cipher类中reset是在构造函数中使用

###Cipher与Mode debug

已经进入了BlockCipher._doProcessBlock

问题可能出在reset中mode的构造上，首先不再有init了

en de 反了，注意类成员要用this.constructor.调用

去除BlockCipher.reset中是否有_mode的判断，一律新建



Cipher 的实例在构造函数中传入xformMode，决定此实例是encryptor还是decryptor，一般通过createEncryptor/createDecryptor创建实例



## 添加类型

添加类型声明，以不改变目前API层级且满足使用为目的，目前采用类的方式

所有的参数先都可选

所有构造函数附上 static create 的声明，构造函数写下面，注释给create



Mode即BlockCipherMode

algo 中除HMAC外都是Hasher



PasswordBasedCipher 和 SerializableCipher 不是实例化的对象，仅提供 encrypt 和 decrypt 方法，

这两个方法中传入的cipher参数是实际的算法类XXXAlgo，为什么是对象而不是实例，是因为encrypt 和 decrypt 方法中它们会传给SerializableCipher.encrypt 和 decrypt 方法，这两个方法中会调用cipher的静态方法cipher.createEncryptor。

因此结合PasswordBasedCipher 和 SerializableCipher中encrypt方法中kdf.execute的cipher.keySize, cipher.ivSize调用格式，这两个成员应该是静态成员而不是实例成员。



2020-04-04 1.23 比对

90884e679206162183b979067209d51668e4751d

Merge pull request [#263](https://github.com/brix/crypto-js/pull/263) from astutejoe/patch-1

但不包括secure random的内容，它问题很多



类型改进

将 object 类型的 cfg 参数尽量改为 XXCfg 的接口

原则，1. 参考 @types/cryptojs; 2. 只给文档中暴露的接口添加

按照 @types/cryptojs 添加如下类型

BlockCipherCfg

SerializableCipherCfg

PasswordBasedCipherCfg

SHA3Cfg

EvpKDFCfg

CipherParamsCfg

凝练一下，只需要三个Cfg

CipherCfg 放在Cipher 之前

HasherCfg 放在 Hasher 之前

DKFCfg 放在 DKF之前

CipherParamsCfg 放在CipherParams之前

对应三个函数的Cfg，在函数附近定义





@types/cryptojs 中 BlockCipher 继承自 IStreamCipher 好像是错的



单文件引入时，好像会判定为 any 不影响使用



2023-06-12 对比

4dcaa7afd08f48cd285463b8f9499cdb242605fa

Merge pull request #380 from Alanscut/dev

**改动**：

所有依赖升级最新

增加真随机数，现在RN的问题已经解决了 https://github.com/brix/crypto-js/pull/259#issuecomment-799973769

TripleDes/Des 结果问题 https://github.com/entronad/crypto-es/issues/22

cipher-core.js要修改一下，根据这两个commit：https://github.com/brix/crypto-js/commit/dcc3848f5de5208bca73f36c0ed77fa192ee2ea8 ，https://github.com/brix/crypto-js/commit/09ee2ab282176f235f26d6a2d4e039cbd6eb3494

增加 enc-base64url.js

增加 blowfish.js

拆分ts类型

另外我们应该开启增加新算法



关于random，采取这样一个策略：最高原则是用 globalThis，次之是用原来的那一坨全局变量，其它就不考虑了，都没有就用Math，同时给出warn。

命名原则：

尽量与原始的Crypto一致（它似乎只有一个常量全大写下划线的特点）（注：不一定与后面PR中的一致）

模块内的顶层变量不一定加 _ ，因为js模块要显式的export

符合一般命名规则



类型采用先tsc生成再精修的方式，生成的符合格式规范，但内容有些不太智能，以手工版为原则精修，成员以生成的为纲

由于生成的是4格缩进，就也先4格

构造函数要按create写，理由见前

~~前面所有参数可选的规则不再遵守，以注释里的例子，结合函数逻辑决定。**最后再检查一遍逻辑**~~ 参数先全部不是可选的，然后再放开。第一步先把所有 cfg 参数，和注释中标明Optional的，注释中给出不传参例子, boolean类型的的, 所有名为XXCfg, XXParams的接口等参数改为可选（这是合理的，因为它太复杂了，而且也是js风格的本意），然后根据test用例增加可选参数

给class添加静态变量，因为涉及到继承的问题，还是作为成员吧

import也学了自动生成的每个语句单独写，为了风格统一

Cipher.encrypt()的第一个参数，CipherCfg.mode等确实应该是Function，因为他们传入的是类不是对象

WordArray和X64WordArray是完全不一样的，不可通用，X64WordArray目前唯一的作用就是转换成WordArray，这在库里不会自动调用。

js中调用未定义的变量会有referenceerror，但是typeof判断不会，会判断它的类型是 'undefined'；undefined.a也会有referenceerror，但是undefined?.a就没事会返回undefined; 或语句前面取值成功了后面有error也没关系。所以globalThis.crypto的判断要用这几点来规避error，不能trycatch