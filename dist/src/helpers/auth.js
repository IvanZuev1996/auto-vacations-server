import crypto from 'crypto';
const SECRET = 'IVAN-ZUEV-REST-API';
export const authentication = (username, password) => {
    return crypto
        .createHmac('sha256', [username, password].join('/'))
        .update(SECRET)
        .digest('hex');
};
export const random = () => crypto.randomBytes(128).toString('base64');
