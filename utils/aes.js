import  crypto from 'crypto'


function generateKey() {
    return crypto.randomBytes(32); 
}

function generateIV() {
    return crypto.randomBytes(16); 
}


function encrypt(text,key,iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(text, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(text, 'hex', 'hex'); 
    decrypted += decipher.final('hex'); 
    return Buffer.from(decrypted, 'hex'); 
}


export {
    encrypt,
    decrypt,
    generateKey,
    generateIV
}