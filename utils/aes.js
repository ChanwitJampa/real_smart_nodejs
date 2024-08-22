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
    let decrypted = decipher.update(text, 'hex', 'hex'); // แปลงจาก hex เป็น hex
    decrypted += decipher.final('hex'); // ผลลัพธ์ที่ได้เป็น hex string
    return Buffer.from(decrypted, 'hex'); // แปลงจาก hex เป็น Buffer
}


export {
    encrypt,
    decrypt,
    generateKey,
    generateIV
}