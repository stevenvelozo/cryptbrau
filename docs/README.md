# Cryptbrau

Simple symmetric encryption for Node.js and browser environments. Cryptbrau wraps the [simple-encryptor](https://www.npmjs.com/package/simple-encryptor) library, providing AES-256-CBC encryption with SHA-256 HMAC authentication. A pre-built Browserify bundle is included for direct use in web pages.

## Quick Start

### Node.js

```bash
npm install cryptbrau
```

```javascript
var libEncryptor = require('cryptbrau')(
	{
		Key: 'SomeVerySecureKeyReally',
		Salt: 'SomeKindOfSalt'
	});

var tmpMessage = 'ThisIsAMessage.';
var tmpEncrypted = libEncryptor.encrypt(tmpMessage);

console.log('Original:  ' + tmpMessage);
console.log('Encrypted: ' + tmpEncrypted);
console.log('Decrypted: ' + libEncryptor.decrypt(tmpEncrypted));
```

### Browser

Include the pre-built bundle in a script tag:

```html
<script src="lib/cryptbrau.js"></script>
<script>
var libEncryptor = cryptBrau(
	{
		Key: 'SomeVerySecureKeyReally',
		Salt: 'SomeKindOfSalt'
	});

var tmpEncrypted = libEncryptor.encrypt('Hello, World!');
console.log(libEncryptor.decrypt(tmpEncrypted));
</script>
```

The browser bundle exposes `window.cryptBrau` as a global constructor.

## Configuration

Pass a Key and Salt when creating an encryptor instance:

```javascript
var libEncryptor = require('cryptbrau')(
	{
		Key: 'YourSecretKey',
		Salt: 'YourSaltValue'
	});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Key` | string | `'ThisIsNotSecureEnough.'` | The encryption key |
| `Salt` | string | `'0000000000000000'` | Additional salt concatenated with the key |

The Key and Salt are concatenated to form the full encryption key. The combined string must be at least 16 characters — if shorter, it is padded automatically.

You can also pass a plain string instead of an options object. It will be used as the Key with the default Salt:

```javascript
var libEncryptor = require('cryptbrau')('MySecretKeyString');
```

## How It Works

Cryptbrau uses AES-256-CBC encryption under the hood:

1. The Key and Salt are concatenated into a full key string
2. The full key is hashed with SHA-256 to produce the AES encryption key
3. A random 16-byte initialization vector (IV) is generated for each encryption
4. The message is JSON-serialized, encrypted, and Base64-encoded
5. A SHA-256 HMAC is prepended for integrity verification
6. On decryption, the HMAC is verified before the message is decrypted

This means you can encrypt any JSON-serializable value — strings, numbers, objects, and arrays all work:

```javascript
// Encrypt an object
var tmpEncrypted = libEncryptor.encrypt({ name: 'Alice', role: 'admin' });
var tmpDecrypted = libEncryptor.decrypt(tmpEncrypted);
// tmpDecrypted is { name: 'Alice', role: 'admin' }
```

If decryption fails (wrong key, tampered data), `decrypt()` returns `null` instead of throwing an error.

## Building the Browser Bundle

The pre-built bundle at `lib/cryptbrau.js` is ready to use. To rebuild it after changes:

```bash
npm install -g browserify
./Build.sh
```

This runs `browserify browser.js -o lib/cryptbrau.js` to bundle all dependencies into a single file.

## Learn More

- [API Reference](api.md) -- Method and configuration details
- [Pict](/pict/pict/) -- The MVC framework Cryptbrau supports
- [Fable](/fable/fable/) -- The core dependency injection framework
