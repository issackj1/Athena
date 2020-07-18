const express = require('express');
const passport = require('passport');
require('../controller/Passport');
const auth = require('../controller/auth');

const router = express.Router();

router.post('/api/login', passport.authenticate('local', { session: false }), auth.login);

router.post('/api/register', auth.register);

router.post('/api/confirm-token', passport.authenticate('jwt', { session: false }), auth.confirmToken);

module.exports = router;
