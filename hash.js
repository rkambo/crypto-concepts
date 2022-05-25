const { createHash } = require('crypto');

function hash(input) {
    return createHash('sha256').update(input).digest('hex');
}

let password = 'password';
const hash1 = hash(password);
console.log(hash1);