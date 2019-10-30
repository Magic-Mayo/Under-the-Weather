const db = require('../models');
const bcrypt = require('bcrypt');
const uid = require('uid-safe');
const token = uid.sync(24);
const controller = require('../controllers')
const moment = require('moment')
// const sess = require('../session')

sessionCheck = (req, res, next) => {
    if (req.session.user && req.cookies.under_weather){
        return res.json(true)
    }
    next();
}

module.exports = (app) => {

    app.get('/check', controller.findByName)

    app.post('/newlocal', (req,res)=>{
        console.log(req.body)
        if(!req.body.username || !req.body.password){ return }

        db.User.findOne({userName: req.body.username}).then(user=>{
            if(user){ return }
            bcrypt.hash(req.body.password, 12)
            .then(hash=>{
                db.User.create({
                    userName: req.body.username,
                    password: hash,
                    loginToken: token,
                    createdAt: moment()
                })
                .then(user=>{
                    res.json({userId: user._id, user: user.data, userName: user.userName})
                })
                .catch(err=>console.log(`Error: ${err}`))
            })
        })
    })

    app.post('/login', (req,res)=>{
        const credentials = req.body.credentials;
        db.User.findOneAndUpdate(
        {userName: credentials.username},
        {lastLogin: moment(), loginToken: token, 'data.isLoggedIn': true},
        {new: true})
            .then(user=>{
            bcrypt.compare(credentials.password, user.password).then(verified=>{
                if(verified){
                    return res.json({userId: user._id, user: user.data, userName: user.userName, token: user.loginToken})
                }
                res.json('Incorrect username and password combination')
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    });

    app.post('/token', controller.checkToken)
}