const auth_routes = require('./auth');
const statisticsCanada_routes = require('./StatisticsCanadaWDS');
const error_routes = require('./error');
const index_routes = require('./index');
const users_routes = require('./users');

module.exports.auth_routes = auth_routes;
module.exports.statisticsCanada_routes = statisticsCanada_routes;
module.exports.error_routes = error_routes;
module.exports.index_routes = index_routes;
module.exports.users_routes = users_routes;
