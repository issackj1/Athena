const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();

const utility_mw = require('./middleware/utility');
const errors_mw = require('./middleware/errors');
const auth_mw = require('./middleware/authentication');
const routes = require('./routes/routes');

const whitelist = ['http://localhost:4000', 'http://localhost:3000', '142.117.30.78', 'https://react-site-five.vercel.app', 'https://react-site.issackj1.vercel.app'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
};

const app = express();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.EXPRESS_SESSION_SECRET));
app.use(express.static(path.join(__dirname, '../athena-ui/build/')));
app.use(compression());
app.use(helmet())

app.use(utility_mw.session);
app.use(auth_mw.hasUserSession);
app.use(auth_mw.attachLocals);

app.use(routes.auth_routes);
app.use(routes.error_routes);
app.use(routes.statisticsCanada_routes);
app.use(routes.index_routes);
app.use(routes.users_routes);

app.use(errors_mw.error_handler_404);
app.use(errors_mw.error_handler_500);

module.exports = app;
