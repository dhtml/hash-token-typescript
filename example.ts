import crypto from 'crypto';

export const encryptUserData = (inputData: any) => {
    // Convert the JSON object to a string
    const secretKey = crypto.scryptSync(String(process.env.REQUEST_TOKEN_SECRET), 'salt', 32);
    const iv = Buffer.from(String(process.env.REQUEST_TOKEN_IV), 'hex');

    // Convert the JSON object to a string
    const jsonString = JSON.stringify(inputData);

    // Encryption
    try {
        // Encryption
        // Convert the JSON object to a string
        const jsonString = JSON.stringify(inputData);

        // Encryption
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
        let encryptedData = cipher.update(jsonString, 'utf8', 'hex');
        encryptedData += cipher.final('hex');

        console.log('Encrypted Data:', encryptedData);
        return encryptedData;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const decryptHashedUserData = (encryptedData: any) => {
    const secretKey = crypto.scryptSync(String(process.env.REQUEST_TOKEN_SECRET), 'salt', 32);
    const iv = Buffer.from(String(process.env.REQUEST_TOKEN_IV), 'hex');

    let result = null;

    try {
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
        let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
        decryptedData += decipher.final('utf8');

        console.log(decryptedData);

        console.log('Decrypted JSON Data:', JSON.parse(decryptedData));
        result = JSON.parse(decryptedData);
    } catch (err) {
        console.log({ err });
    }

    return result;
};
