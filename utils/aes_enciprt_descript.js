
import  crypto  from 'crypto'


const encryptionKey = crypto.randomBytes(32); 
const iv = crypto.randomBytes(16); 


function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}


export{
    decrypt,
    encrypt
}