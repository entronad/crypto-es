## 2.1.0

**2023-10-24**

- Change pbkdf2 default params to enhance security: https://github.com/entronad/crypto-es/security/advisories/GHSA-mpj8-q39x-wq5h

## 2.0.4

**2023-07-25**

- Declare no side effects for tree shaking: https://github.com/entronad/crypto-es/pull/37

## 2.0.3

**2023-07-17**

- Remove Math.random() runtime console warning. It is not always wanted to show in in the client consle when Math.random() has to be used.

## 2.0.2

**2023-07-12**

- upgrade global crypto assignment with typeof: https://github.com/entronad/crypto-es/issues/34

## 2.0.1

**2023-07-12**

- Wrap the global crypto assignment with try/catch: https://github.com/entronad/crypto-es/issues/34

## 2.0.0

**2023-07-10**

- Enhance the support of TypeScript. Now every js file has its own d.ts file for partially importing in TypeScript. And all types has been tested.
- A real random generator from globalThis.crypto is used instead of Math.random. If the environment doesn't support globalThis(or global/window/self/frames), it will rollback to Math.random with a warning log.
- Fix the TripleDes/Des issue: https://github.com/entronad/crypto-es/issues/22
- Fix the cipher-core issue of CryptoJS: https://github.com/brix/crypto-js/commit/dcc3848f5de5208bca73f36c0ed77fa192ee2ea8 , https://github.com/brix/crypto-js/commit/09ee2ab282176f235f26d6a2d4e039cbd6eb3494
- Add base64url algorithm.
- Add blowfish algorithm.

## 1.2.6

**2021-02-08**

- [Fix a type error](https://github.com/entronad/crypto-es/issues/12).

## 1.2.6

**2020-08-01**

- [Fix a type error](https://github.com/entronad/crypto-es/pull/8).

## 1.2.5

**2020-05-19**

- Improve some param types in index.d.ts.

## 1.2.4

**2020-04-04**

- Add change logs link to readme.

## 1.2.3

**2020-04-04**

- Impliment [this PR](https://github.com/brix/crypto-js/pull/211) of CryptoJS, witch is about TripleDES key.
- We will not use secure random like CryptoJS for now, for it has some issues.
- Change Cyphers' keySize and ivSize to static properties to Fix some issues.
- Fix some issues in type file.

## 1.2.2

**2020-02-21**

- Fix guides for TypeScript usage.

## 1.2.1

**2020-01-23**

- Add guides for TypeScript usage.

## 1.2.0

**2020-01-09**

- Add types for TypeScript usage.
- Update license to 2020.

## 1.1.1

**2019-07-15**

- Remove loader.mjs, insead using package.json type field for ECMAScript Modules.
- Update README.md.

## 1.1.0

**2019-07-12**

- Add support for ArrayBuffer and TypedArray.
- Change some inner object names in case of confusion for partially import. 

## 1.0.2

**2019-01-20**

- Update README.md.

## 1.0.1

**2019-01-19**

- Add keywords.

## 1.0.0

**2019-01-19**

- Initial version.
- Impliment all CryptoJS APIs.
