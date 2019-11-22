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

    app.get('/check/:email', controller.findByEmail)

    app.post('/newlocal', (req,res)=>{
        console.log(req.body)
        const body = req.body
        if(!req.body.email || !req.body.password){ return }

        db.User.findOne({"data.email": body.email}).then(user=>{
            if(user){ return res.json(false) }
            bcrypt.hash(body.password, 12)
            .then(hash=>{
                db.User.create({
                    'data.email': body.email,
                    password: hash,
                    loginToken: token,
                    'data.firstName': body.firstName,
                    'data.lastName': body.lastName,
                    'data.gender': body.gender,
                    'data.DOB': body.DOB,
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
            {'data.email': credentials.email},
            {lastLogin: moment(), loginToken: token, 'data.isLoggedIn': true},
            {new: true})
            .then(user=>{
                if(!user){
                    return res.json(false)
                }
                bcrypt.compare(credentials.password, user.password).then(verified=>{
                    if(user && verified){
                        return res.json({userId: user._id, user: user.data, token: user.loginToken})
                    }
                    
                    res.json(false)
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    });

    app.post('/token', controller.checkToken)
}