const axios = require('axios');

module.exports.getCubeMetaData = ( req, res, next ) => {
    axios({
        method: 'post',
        url: 'https://statcan-web-data-service-statcan.api.canada.ca/v1/getCubeMetadata',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'user_key': process.env.user_key
        },
        responseType: 'json',
        data: [
            {
                productId: req.params.productId,
            }
        ]
    })
        .then(
            ( result ) => {
                res
                    .status(result.status)
                    .send(result.data[0]);
            },
            ( error ) => {
                res
                    .status(error.response.status)
                    .send(error.response.data)
            }
        );
};

module.exports.getDataFromVectorsAndLatestNPeriods = ( req, res, next ) => {
    axios({
        method: 'post',
        url: 'https://statcan-web-data-service-statcan.api.canada.ca/v1/getDataFromVectorsAndLatestNPeriods',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'user_key': process.env.user_key
        },
        responseType: 'json',
        data: [
            {
                vectorId: req.params.vectorId,
                latestN: req.params.latestN,
            }
        ]
    })
        .then(
            ( result ) => {
                res
                    .status(result.status)
                    .send(result.data);
            },
            ( error ) => {
                res
                    .status(error.response.status)
                    .send(error.response.data)
            }
        );

};

module.exports.getDataFromCubePidCoordAndLatestNPeriods = ( req, res, next ) => {
    axios({
        method: 'post',
        url: 'https://statcan-web-data-service-statcan.api.canada.ca/v1/getDataFromCubePidCoordAndLatestNPeriods',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'user_key': process.env.user_key
        },
        responseType: 'json',
        data: [
            {
                productId: req.params.productId,
                coordinate: req.params.coordinate,
                latestN: req.params.latestN,
            }
        ]
    })
        .then(
            ( result ) => {
                res
                    .status(result.status)
                    .send(result.data);
            },
            ( error ) => {
                res
                    .status(error.response.status)
                    .send(error.response.data)
            }
        );
};

module.exports.getChangedSeriesDataFromVector = ( req, res, next ) => {
    axios({
        method: 'post',
        url: 'https://statcan-web-data-service-statcan.api.canada.ca/v1/getChangedSeriesDataFromVector',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'user_key': process.env.user_key
        },
        responseType: 'json',
        data: [
            {
                vectorId: req.params.vectorId
            }
        ]
    })
        .then(
            ( result ) => {
                res
                    .status(result.status)
                    .send(result.data);
            },
            ( error ) => {
                res
                    .status(error.response.status)
                    .send(error.response.data)
            }
        );
};

