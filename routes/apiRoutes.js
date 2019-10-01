import Strategy from '../passport.js';

const moment = require('moment');
const db = require('../models');
const passport = require('passport');

module.exports = (app) => {
    app.post('/login', Strategy.local(), (req,res)=>{
        res.redirect(`/users/${req.user.username}`);
    });

    app.post('/auth/facebook', Strategy.facebook.auth());
    app.get('auth/facebook/callback', Strategy.facebook.redirect());
    app.post('/auth/google', Strategy.google.auth());
    app.get('auth/google/callback', Strategy.google.redirect());
    
    app.get('/users/:user', (req,res)=>{
        db.User.findOne({where: {userName: require.params.user}}).then(user=>{
            res.redirect('/', user)
        })
    })
}