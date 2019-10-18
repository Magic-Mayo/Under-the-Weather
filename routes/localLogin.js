const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models')

passport.use(new LocalStrategy(
    function(username, password, done) {
        db.User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

module.exports = (app) => {
    app.post('/newlocal', (req,res)=>{
        console.log(req.body)
    })

    app.post('/login',
        passport.authenticate('local'),
        (req,res)=>{
            res.redirect(`home/${req.user.username}`)
        }
    );
}