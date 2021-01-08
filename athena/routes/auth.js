const express = require('express');
const passport = require('passport');
const auth = require('../controller/auth');

const router = express.Router();

router.post('/api/login', passport.authenticate('local', { session: false }), auth.login);

router.post('/api/register', auth.register);

router.post('/api/confirm-token', auth.confirmToken);

module.exports = router;
