require('mongoose');
const User = require('../models/user');

let saveUserData = (register, user_data, hashed_pwd) => {
    /* Needs validation */
    const current_date = Date.now();
    const full_name = user_data.full_name;
    const email = {
        address: register.email,
        isVerified: true,
        confirmation: {
            token: null,
            expiration: null
        }
    };
    const role = 'user';

    return new Promise((resolve, reject) => {
        const user = new User({
            fullName: full_name,
            email: email,
            password: hashed_pwd,
            role: role,
            status: 'active',
            createdOn: current_date,
            lastUpdated: current_date
        });
        user
            .save()
            .then(_player => {
                resolve(_player);
            })
            .catch(err => {
                reject(err);
            });
    });
};

module.exports.savePlayerData = saveUserData;
