const PROTOCOL = process.env.PROTOCOL;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const USER_PWD = process.env.USER_PWD;
const CLUSTER = process.env.CLUSTER;

module.exports.DB_URI = PROTOCOL + DB_USER + ":" + USER_PWD + CLUSTER + DB_NAME + "?retryWrites=true&w=majority";
