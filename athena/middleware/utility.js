const cors = require('cors'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session);

const database = require('../utils/database');

module.exports.session = session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    store: new MongoDBStore({
        uri: database.DB_URI,
        collection: "sessions"
    }),
    cookie: {
        maxAge: Date.now() + (30 * 86400 * 1000)
    }
});

module.exports.cors = cors();
