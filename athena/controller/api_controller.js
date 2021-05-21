const bcrypt = require('bcryptjs');
const data_controller = require('./data_controller');
const Register = require('../models/register');

module.exports.POSTRegister = (req, res, next) => {
    const userToken = req.params.userToken || req.body.userToken;
    Register.findOne({ token: userToken, tokenExpiration: { $gt: Date.now() } })
        .then(_register => {
            bcrypt.hash(req.body.password, 12)
                .then(_pwd => {
                    data_controller.savePlayerData(_register, req.body, _pwd)
                        .then(_player => {
                            res.redirect('/login');
                        })
                        .catch(err => {
                            next(new Error(err));
                        });
                })
                .catch(err => {
                    next(new Error(err));
                });
        })
        .catch(err => {
            next(new Error(err));
        });
};
