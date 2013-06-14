var	crypto	= require('crypto'),
	string	= require('misc/string');

exports.hexToBase64 = function(data) {
	return new Buffer(data, 'hex').toString('base64');
};
exports.base64ToHex = function(data) {
	return new Buffer(data, 'base64').toString('hex');
};

/* Hash */
exports.hash = function(data, algorithm, encoding) {
	encoding = encoding || "hex";
	var h = crypto.createHash(algorithm);
	h.update(data,'utf8');
	return h.digest(encoding);
};
exports.sha1 = function(data) {
	return exports.hash(data, 'sha1');
};
exports.md5 = function(data) {
	return exports.hash(data, 'md5');
};
exports.sha256 = function(data) {
	return exports.hash(data, 'sha256');
};
exports.sha512 = function(data) {
	return exports.hash(data, 'sha512');
};


/* MAC */
exports.mac = function(data, key, algorithm) {
	var m = crypto.createHmac(algorithm, key);
	m.update(data);
	return m.digest('base64');
};
exports.mac_sha1 = function(data, key) {
	return exports.mac(data, key, 'sha1');
};
exports.mac_md5 = function(data, key) {
	return exports.mac(data, key, 'md5');
};
exports.mac_sha256 = function(data, key) {
	return exports.mac(data, key, 'sha256');
};
exports.mac_sha512 = function(data, key) {
	return exports.mac(data, key, 'sha512');
};


/* Cipher */
var CIPHER_SALT_BLOCK_COUNT = 12;
exports.encrypt = function(data, key, algorithm) {
	var s = string.random(CIPHER_SALT_BLOCK_COUNT*3);
	var c = crypto.createCipher(algorithm, key + s);
	var u = c.update(data, 'utf8', 'hex');
	
	return Buffer(s,'utf8').toString('base64') + exports.hexToBase64(u + c.final('hex'));
};
exports.decrypt = function(data, key, algorithm) {
	var s = Buffer(data.substring(0,CIPHER_SALT_BLOCK_COUNT*4),'base64').toString('utf8');
	data = data.substring(CIPHER_SALT_BLOCK_COUNT*4);
	var d = crypto.createDecipher(algorithm, key + s);
	var u = d.update(exports.base64ToHex(data), 'hex', 'utf8');
	
	return u + d.final('utf8');
};
exports.aes128 = function(data, key) {
	return exports.encrypt(data, key, 'AES-128-CFB');
};
exports.aes192 = function(data, key) {
	return exports.encrypt(data, key, 'AES-192-CFB');
};
exports.aes256 = function(data, key) {
	return exports.encrypt(data, key, 'AES-256-CFB');
};
exports.rc4 = function(data, key) {
	return exports.encrypt(data, key, 'RC4-40');
};
exports.blowfish = function(data, key) {
	return exports.encrypt(data, key, 'BF-CBC');
};

exports.aes128_d = function(data, key) {
	return exports.decrypt(data, key, 'AES-128-CFB');
};
exports.aes192_d = function(data, key) {
	return exports.decrypt(data, key, 'AES-192-CFB');
};
exports.aes256_d = function(data, key) {
	return exports.decrypt(data, key, 'AES-256-CFB');
};
exports.rc4_d = function(data, key) {
	return exports.decrypt(data, key, 'RC4-40');
};
exports.blowfish_d = function(data, key) {
	return exports.decrypt(data, key, 'BF-CBC');
};


/* Authenticated Encryption */
var AUTH_ENCRYPT_MAC_SIZE = 160;
var AUTH_ENCRYPT_MAC_BASE64_SIZE = Math.ceil(AUTH_ENCRYPT_MAC_SIZE/8*4/3);
exports.auth_encrypt = function(data, key, algorithm) {
	var enc = exports.encrypt(data, key, algorithm);
	var mac = exports.mac_sha1(enc, key);
	return mac.substring(0,AUTH_ENCRYPT_MAC_BASE64_SIZE) + enc;
};
exports.auth_decrypt = function(data, key, algorithm) {
	var mac = data.substring(0,AUTH_ENCRYPT_MAC_BASE64_SIZE);
	data = data.substring(AUTH_ENCRYPT_MAC_BASE64_SIZE);
	var dec = exports.decrypt(data, key, algorithm);
	return (mac == exports.mac_sha1(data, key).substring(0,AUTH_ENCRYPT_MAC_BASE64_SIZE)) ? dec : null;
};
exports.auth_aes128 = function(data, key) {
	return exports.auth_encrypt(data, key, 'aes128');
};
exports.auth_aes192 = function(data, key) {
	return exports.auth_encrypt(data, key, 'aes192');
};
exports.auth_aes256 = function(data, key) {
	return exports.auth_encrypt(data, key, 'aes256');
};
exports.auth_rc4 = function(data, key) {
	return exports.auth_encrypt(data, key, 'rc4');
};
exports.auth_blowfish = function(data, key) {
	return exports.auth_encrypt(data, key, 'blowfish');
};

exports.auth_aes128_d = function(data, key) {
	return exports.auth_decrypt(data, key, 'aes128');
};
exports.auth_aes192_d = function(data, key) {
	return exports.auth_decrypt(data, key, 'aes192');
};
exports.auth_aes256_d = function(data, key) {
	return exports.auth_decrypt(data, key, 'aes256');
};
exports.auth_rc4_d = function(data, key) {
	return exports.auth_decrypt(data, key, 'rc4');
};
exports.auth_blowfish_d = function(data, key) {
	return exports.auth_decrypt(data, key, 'blowfish');
};


/* Password Function */
exports.password = function(a0,a1,a2,a3,a4) {
	a0=a0||""; a1=a1||""; a2=a2||""; a3=a3||""; a4=a4||"";
	return exports.hash(exports.hash(String(a0) + String(a2),"md5","base64") + exports.hash(String(a1) + String(a3),"md5","base64") + String(a4),"sha1","hex");
};