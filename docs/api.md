# API Reference

## Factory Function

### cryptbrau(pOptions)

Create an encryptor instance. The encryptor is lazily initialized — the underlying encryption engine is not created until the first call to `encrypt()` or `decrypt()`.

```javascript
var libEncryptor = require('cryptbrau')(pOptions);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `pOptions` | object or string | Configuration object with Key and Salt, or a plain string used as the Key |

**Returns:** `object` — An encryptor instance with `encrypt()` and `decrypt()` methods.

#### Options Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Key` | string | `'ThisIsNotSecureEnough.'` | The encryption key |
| `Salt` | string | `'0000000000000000'` | Salt concatenated with the key before hashing |

If `pOptions` is a string, it is used as the `Key` with the default `Salt`.

The Key and Salt are concatenated to form `FullKey`. If `FullKey` is shorter than 16 characters, it is padded with zeros.

---

## Instance Methods

### encrypt(pMessage)

Encrypt a message. The message can be any JSON-serializable value — strings, numbers, objects, or arrays.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pMessage` | any | The value to encrypt |

**Returns:** `string` — Base64-encoded ciphertext with prepended HMAC and IV.

```javascript
var tmpEncrypted = libEncryptor.encrypt('secret message');
var tmpEncryptedObj = libEncryptor.encrypt({ user: 'alice', token: 'abc123' });
```

Each call generates a new random IV, so encrypting the same message twice produces different ciphertext.

---

### decrypt(pMessage)

Decrypt a message previously encrypted with `encrypt()`. The HMAC is verified before decryption to detect tampering.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pMessage` | string | The encrypted string from `encrypt()` |

**Returns:** `any | null` — The original value, or `null` if decryption fails.

Decryption fails (returns `null`) when:
- The key or salt does not match the one used to encrypt
- The ciphertext has been tampered with (HMAC mismatch)
- The input is not a valid encrypted string

```javascript
var tmpDecrypted = libEncryptor.decrypt(tmpEncrypted);
if (tmpDecrypted === null)
{
	console.log('Decryption failed — wrong key or corrupted data');
}
```

---

### InitializeEncryptor()

Manually initialize the underlying simple-encryptor engine. This is called automatically on the first `encrypt()` or `decrypt()` call; you only need it if you want to force early initialization.

**Returns:** `boolean` — Always returns `true`.

---

## Instance Properties

### Options

The resolved configuration for this encryptor instance.

| Property | Type | Description |
|----------|------|-------------|
| `Key` | string | The encryption key |
| `Salt` | string | The salt value |
| `FullKey` | string | Key + Salt (padded to ≥16 chars) |

---

### Encryptor

The underlying `simple-encryptor` instance. `false` until the first `encrypt()` or `decrypt()` call triggers initialization.

**Type:** `object | false`

---

## Browser Global

When using the pre-built bundle (`lib/cryptbrau.js`), the factory function is available as `window.cryptBrau`:

```html
<script src="lib/cryptbrau.js"></script>
<script>
var libEncryptor = window.cryptBrau({ Key: 'MyKey', Salt: 'MySalt' });
</script>
```

---

## Encryption Details

| Property | Value |
|----------|-------|
| Algorithm | AES-256-CBC |
| Key derivation | SHA-256 hash of FullKey |
| IV | Random 16-byte per encryption |
| HMAC | SHA-256 for integrity verification |
| Encoding | Base64 |
| Output format | `[HMAC][IV][EncryptedData]` |
