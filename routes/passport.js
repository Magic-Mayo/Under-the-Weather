require('dotenv').config();
const moment = require('moment');
const db = require('../models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
   });
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        db.User.findOne({ username: username }, (err, user)=>{
        if (err) { return done(err); }
        if (!user || !user.validPassword(password)) {
            return done(null, false, { message: 'Please verify you are using the correct user name and password combination' });
        }
        return done(null, user);
        });
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET || FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback' || "https://under-the-weather.herokuapp.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
    db.User.findOne({userName: profile.id}, (err, user)=>{
        if (err) { return done(err); }
        if(!user){
            db.User.create({
                userName: profile.id,
                name: profile.displayName
            }).then(user=>{done(user)})
        } else {
            done(user);
        }
    });
    }
));

passport.use(new GoogleStrategy({
    clientID:  process.env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID,
    clientSecret:  process.env.GOOGLE_CLIENT_SECRET || GOOGLE_CLIENT_SECRET,
    callbackURL: 'localhost:3000/auth/google/callback' || "https://under-the-weather.herokuapp.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        db.User.findOne({ userName: profile.id }, (err, user)=>{
            if(!user){
                db.User.create({
                    userName: profile.id
                }).then(user=>{return done(err, user)})
            } else {
                return done(err, user);
            }
        });
    }
));

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    app.post('/login', passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: 'Please verify you are using the correct user name and password combination'
        }),
        (req,res,next)=>{
            res.redirect(`/users/${req.user.username}`);
        }
    );

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['public_profile','email']}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'},
        (req,res,next)=>{
            res.redirect('/home')
        }
    ));

    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }),
        function(req, res) {

            res.redirect('/');
        }
    );
    
    app.get('/users/:user', (req,res)=>{
        db.User.findOne({where: {userName: req.params.user}}).then(user=>{
            res.redirect('/', user)
        })
    })
}