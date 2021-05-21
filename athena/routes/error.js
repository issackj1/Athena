const express = require('express');
const error_mw = require('../middleware/errors');

const router = express.Router();

router.get('/403', error_mw.error_handler_403);
router.get('/404', error_mw.error_handler_404);

module.exports = router;
