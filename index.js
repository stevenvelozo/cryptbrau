/**
* cryptbrau
*
* @license MIT
* @author Steven Velozo <steven@velozo.com>
*
* Simple asymmetric encryption in the browser.
*
* OMG yes this is not es6 because browsers and stuff.
*/

// Set the cryptBrau object in the window
var cryptBrau = function(pOptions)
{
	// Get some default options
	var defaultOptions = function(pOptionKey)
		{
			tmpKey = (typeof(pOptionKey) === 'string') ? pOptionKey : 'ThisIsNotSecureEnough.'
			return { Key: tmpKey, Salt: '0000000000000000' };
		};

	// Most secure way to create this thing is by passing in a Key and a Salt.
	var tmpBrau = {};
	tmpBrau.Options = (typeof(pOptions) === 'object') ? pOptions : defaultOptions(pOptions);

	// Validate some salt is in there
	tmpBrau.Options.Salt = (typeof(tmpBrau.Options.Salt) === 'string') ? tmpBrau.Options.Salt : defaultOptions().Salt;

	// Build the actual key that is used to build the hash.
	tmpBrau.Options.FullKey = tmpBrau.Options.Key + tmpBrau.Options.Salt;

	// Make sure our key is long enough
	if (tmpBrau.Options.FullKey.length < 16)
		tmpBrau.Options.FullKey += '0000000000000000';

	tmpBrau.Encryptor = false;

	tmpBrau.InitializeEncryptor = function()
	{
		tmpBrau.Encryptor = require('simple-encryptor')(tmpBrau.Options.FullKey);
		return true;
	}

	tmpBrau.encrypt = function(pMessage)
	{
		// Initialize the encryptor if it deosn't exist yet
		if (!tmpBrau.Encryptor)
			tmpBrau.InitializeEncryptor();

		return tmpBrau.Encryptor.encrypt(pMessage);
	};

	tmpBrau.decrypt = function(pMessage)
	{
		// Initialize the encryptor if it deosn't exist yet
		if (!tmpBrau.Encryptor)
			tmpBrau.InitializeEncryptor();

		return tmpBrau.Encryptor.decrypt(pMessage);
	};

	return tmpBrau;
}

module.exports = cryptBrau;