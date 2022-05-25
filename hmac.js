/* HMAC stands for Hash-Based Message Authentication Code
 * 
 * This uses the principle that it is a hash that requires a password.
 * This allows uniqueness with the hash to only be generated by trusted users
 * Ex A JSON web token is only generated by someone who knows the secret key
 * 
 */

const { createHmac } = require('crypto');

const key = 'super-secret!';
const message = 'boo';

const hmac = createHmac('sha256', key).update(message).digest('hex');

console.log(hmac);

const key2 = 'other-password';
const hmac2 = createHmac('sha256', key2).update(message).digest('hex');

console.log(hmac2);