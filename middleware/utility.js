const cors = require('cors'),
    express_session = require('express-session'),
    MongoDBSession = require('connect-mongodb-session')(express_session);

const database = require('../utils/database');

module.exports.session = express_session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    store: new MongoDBSession({
        uri: database.DB_URI,
        collection: "sessions"
    }),
    cookie: {
        maxAge: Date.now() + (30 * 86400 * 1000)
    }
});

module.exports.cors = cors();
