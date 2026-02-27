# Cryptbrau

> Simple symmetric encryption for Node.js and the browser

Encrypt and decrypt strings or objects with a single Key and Salt. Cryptbrau wraps the simple-encryptor library to provide AES-256-CBC encryption with HMAC authentication, bundled for use in browser applications via Browserify.

- **Symmetric** -- One shared key encrypts and decrypts; no key exchange needed
- **Browser-Ready** -- Pre-built Browserify bundle works directly in script tags
- **Authenticated** -- SHA-256 HMAC verification prevents tampering
- **Lazy Init** -- Encryptor is created on first use, not at construction time

[Quick Start](README.md)
[API Reference](api.md)
[GitHub](https://github.com/stevenvelozo/cryptbrau)
