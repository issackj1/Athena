const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;

// Jwt Strategy
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET
        },
        (payload, done) => {
            User.findById(payload.sub)
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                })
                .catch(err => {
                    return done(err, false);
                });
        }
    )
);

// Local Strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        (email, password, done) => {
            User.findOne({ 'email.address': email })
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }
                    user
                        .isPwdValid(password)
                        .then(isValid => {
                            if (!isValid) {
                                return done(null, false);
                            }
                            done(null, user);
                        })
                        .catch(err => {
                            done(err, false);
                        });
                })
                .catch(err => {
                    done(err, false);
                });
        }
    )
);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
        const userInformation = {
            username: user.username,
        };
        cb(err, userInformation);
    });
});
