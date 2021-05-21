const User = require('../models/user');

module.exports.isAuthenticated = function (req, res, next) {
    if (!req.session) {
        return res.redirect('/api/login');
    }
    next();
};

module.exports.isAlreadyLoggedIn = function (req, res, next) {
    if (req.session.passport) {
        return res.redirect('/api');
    }
    next();
};

module.exports.hasUserSession = function (req, res, next) {
    if (!req.session.user) {
        return next();
    }

    User.findById(req.session.user._id)
        .then(function (user) {
            req.user = user;
            next();
        })
        .catch(function (err) {
            console.log(err);
        });
};

module.exports.isAdmin = function (req, res, next) {
    if (req.user.role !== 'admin') {
        if (req.user.role === 'developer')
            return next();
        return res.redirect('/403');
    }
    next();
};

module.exports.isUser = (req, res, next) => {
    if (!req.user.role)
        return req.redirect('/403');

    if (req.user.role === 'user' || req.user.role === 'developer')
        return next();
    else
        res.redirect('/403');
};

module.exports.attachLocals = function (req, res, next) {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.copyrightYear = new Date().getFullYear();
    res.locals.links = require('../utils/links');
    res.locals.path = req.url;
    next();
};


