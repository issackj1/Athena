const tokenGen = require('../../helpers/TokenGenerator');

const User = require('../../models/user');

module.exports.RegisterUser = (data) => {
    let {
        fullName,
        password,
        username,
    } = data;

    let email = {
        address: data.email,
        isVerified: false,
        confirmation: {
            token: '',
            expiration: Date.now() + 86400000
        }
    };

    return new Promise((resolve, reject) => {
        tokenGen
            .Generate()
            .then(token => {
                email.confirmation.token = token;
                const user = new User({
                    email,
                    fullName,
                    password,
                    role: 'user',
                    status: 'pending',
                    username
                });
                user
                    .save()
                    .then(_user => {
                        resolve(_user);
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};
