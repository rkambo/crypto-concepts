const { scryptSync, randomBytes } = require('crypto');

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    // Use a salt with your hash so that an attacker cannot brute force through a table of precomputed hashes

    const user = { email, password: `${salt}:${hashedPassword}`}

    users.push(user);
    return user;
}

function login(email, password) {
    const user = users.find(v => v.email === email);
    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);

    //  Helps prevent timing attacks where an attacker measures the amount of time taken to perform an operation to obtain information
    //  about the value. I.e if you're comparing two strings, a typical function will compare one character at a time and return at the
    // first instance of difference, i.e 'abcd' vs 'abbd' would reject at the third loop iteration, while 'abcd' vs 'abca' would reject 
    // at the fourth, meaning that a hacker can brute force based on the time differences. The timingSafeEqual function will take the same
    // amount of time for any comparison
    
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if(match) {
        return 'login success!'
    } else {
        return 'login fail!'
    }
}