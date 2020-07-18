require('express');
require('bcryptjs');
require('mongoose');
const Jwt = require('jsonwebtoken'),
    RegManager = require('./data/Registration'),
    User = require('../models/user'),
    JWT_SECRET = process.env.JWT_SECRET;

let SignToken = user => {
    return Jwt.sign(
        {
            iss: 'react-site',
            sub: user._id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        },
        JWT_SECRET
    );
};

module.exports.login = (req, res, next) => {
    res.status(200).json({ token: "Bearer " + SignToken(req.user) });
};

module.exports.register = (req, res, next) => {
    const { email, accountType = 'user' } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(403).json({ error: 'User already exists' });
            }
            RegManager.RegisterUser(req.body, accountType)
                .then(user => {
                    const token = SignToken(user);
                    return res.status(201).json({
                        token,
                        user
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: 'Internal server error' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

module.exports.confirmToken = (req, res, next) => {
    const token = req.body.token;
    res.status(200).json({ success: true });
};
