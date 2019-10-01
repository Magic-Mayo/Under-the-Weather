require('/.env').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-goole-oauth').OAuth2Strategy;
const FBStrategy = require('passport-facebook');


passport.use(new LocalStrategy(
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
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://under-the-weather.herokuapp.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        db.User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));
passport.use(new FBStrategy({
    clientID: FACEBOOK_APP_ID || process.env.FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET || process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://under-the-weather.herokuapp.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
    db.User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
    }
));

module.exports = {
    local: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),
    facebook: {
        auth: passport.authenticate('facebook'),
        redirect: passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login',
        })
    },
    google: {
        auth: passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }),
        redirect: passport.authenticate('google', {failureRedirect: '/login'}),
        function(req, res) {
            res.redirect('/')
        }
    }
}