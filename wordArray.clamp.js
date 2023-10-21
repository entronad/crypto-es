// TypeError: wordArray.clamp is not a function #41


// Receiving this error when trying to Base64 encode an encryption result like this:

const encrypted_content: string = CryptoES.AES.encrypt( content, password ).toString( CryptoES.enc.Base64 );

// It works when I don't pass any formatter to the toString() function:

const encrypted_content: string = CryptoES.AES.encrypt( content, password ).toString();

// The same (unresolved) issue already exists in the CryptoJS library:

// To address this issue,

const encrypted_content = CryptoES.AES.encrypt(content, password).toString();
const base64Encoded = CryptoES.enc.Base64.stringify(CryptoES.enc.Utf8.parse(encrypted_content));

// OR you use this

const base64EncodedCipherText = Buffer.from(cipherText, 'binary').toString('base64');
