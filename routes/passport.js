require('dotenv').config();
const moment = require('moment');
const db = require('../models/User.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FBStrategy = require('passport-facebook').Strategy;

const Local = passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user || !user.validPassword(password)) {
            return done(null, false, { message: 'Please verify you are using the correct user name and password combination' });
        }
        return done(null, user);
        });
    }
));

const facebook = passport.use(new FBStrategy({
    clientID: process.env.FACEBOOK_APP_ID || FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET || FACEBOOK_APP_SECRET,
    callbackURL: 'localhost:3000/auth/facebook/callback' || "https://under-the-weather.herokuapp.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
    db.User.findOrCreate(profile, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
    }
));

const google = passport.use(new GoogleStrategy({
    clientID:  process.env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID,
    clientSecret:  process.env.GOOGLE_CLIENT_SECRET || GOOGLE_CLIENT_SECRET,
    callbackURL: 'localhost:3000/auth/google/callback' || "https://under-the-weather.herokuapp.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        db.User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

module.exports = (app) => {
    app.post('/login', passport.authenticate('local', {
            successRedirect: `/home`,
            failureRedirect: '/',
            failureFlash: 'Please verify you are using the correct user name and password combination'
        }),
        (req,res)=>{
            res.redirect(`/users/${req.user.username}`);
        }
    );

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/'
    }));
    app.get('/auth/google', passport.authenticate('google'));
    app.get('auth/google/callback', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));
    
    app.get('/users/:user', (req,res)=>{
        db.User.findOne({where: {userName: req.params.user}}).then(user=>{
            res.redirect('/', user)
        })
    })
}