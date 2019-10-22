const db = require('../models');
const bcrypt = require('bcrypt');
const uid = require('uid-safe');
const token = uid.sync(24);
const controller = require('../controllers')
const mongoose = require('mongoose');

// const connection = 

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
                    loginToken: token
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
        db.User.findOneAndUpdate({userName: credentials.username}, {loginToken: token, 'data.isLoggedIn': true}, {new: true}).then(user=>{
            bcrypt.compare(credentials.password, user.password).then(verified=>{
                if(verified){
                    return res.json({userId: user._id, user: user.data, userName: user.userName, token: user.loginToken})
                }
                res.json('Incorrect username and password combination')
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    });

    app.post('/token/', (req,res)=>{
        const token = req.body.token;
        db.User.findOne({loginToken: token}).then(user=>{
            console.log(user)
            if (!user){return res.json(false)};

            if (user.loginToken === token){
                return res.json({userId: user._id, user: user.data, userName: user.userName})
            }
        }).catch(err=>console.log(err))
    })
}