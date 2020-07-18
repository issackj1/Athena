const express = require('express'),
    router = express.Router(),
    StatisticsCanadaWDSController = require('../controller/StatisticsCanadaWDSController'),
    auth_mw = require('../middleware/authentication');

router.post('/api/v1/getCubeMetaData/:productId', StatisticsCanadaWDSController.getCubeMetaData);
router.post('/api/v1/getDataFromVectorsAndLatestNPeriods/:vectorId/:latestN', [auth_mw.isAuthenticated, auth_mw.isUser], StatisticsCanadaWDSController.getDataFromVectorsAndLatestNPeriods);
router.post('/api/v1/getDataFromCubePidCoordAndLatestNPeriods/:productId/:coordinate/:latestN', [auth_mw.isAuthenticated, auth_mw.isUser], StatisticsCanadaWDSController.getDataFromCubePidCoordAndLatestNPeriods);
router.post('/api/v1/getChangedSeriesDataFromVector/:vectorId', [auth_mw.isAuthenticated, auth_mw.isUser], StatisticsCanadaWDSController.getChangedSeriesDataFromVector);

module.exports = router;
