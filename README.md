# cryptbrau
Simple browser-based symmetric encryption.  Uses the simple-encryptor library on npm.

Also, boy howdy.  Can't get browserify to do what I want.  So for now, whatever.

## Example
Basic ES6 class:

```js
// Classes are used just like ES5 constructor functions:
var libEncryptor = cryptbrau({Key:'SomeVerySecureKeyReally', Salt:'SomeKindOfSalt'});

var tmpMessage = 'ThisIsAMessage.';
var tmpEncryptedMessage = libEncryptor.encrypt(tmpMessage);

console.log('Message:   '+tmpMessage);
console.log('Encrypted: '+tmpEncryptedMessage);
console.log('Decrypted: '+libEncryptor.decrypt(tmpEncryptedMessage));
```
