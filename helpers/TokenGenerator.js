const crypto = require('crypto');

module.exports.Generate = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, buffer) => {
            if (err) {
                reject(err);
            }
            const token = buffer.toString('hex');
            resolve(token);
        });
    });
};
