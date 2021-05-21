const express = require('express'),
    router = express.Router(),
    StatisticsCanadaWDSController = require('../controller/StatisticsCanadaWDSController'),
    auth_mw = require('../middleware/authentication');
const passport = require("passport");
require('../controller/Passport');

router.post('/api/v1/getCubeMetaData/:productId', passport.authenticate('jwt', { session: false }), StatisticsCanadaWDSController.getCubeMetaData);
router.post('/api/v1/getDataFromVectorsAndLatestNPeriods/:vectorId/:latestN', passport.authenticate('jwt', { session: false }), StatisticsCanadaWDSController.getDataFromVectorsAndLatestNPeriods);
router.post('/api/v1/getDataFromCubePidCoordAndLatestNPeriods/:productId/:coordinate/:latestN', passport.authenticate('jwt', { session: false }), StatisticsCanadaWDSController.getDataFromCubePidCoordAndLatestNPeriods);
router.post('/api/v1/getChangedSeriesDataFromVector/:vectorId', passport.authenticate('jwt', { session: false }), StatisticsCanadaWDSController.getChangedSeriesDataFromVector);

module.exports = router;
