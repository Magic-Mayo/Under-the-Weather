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
                    token: token
                })
                .then(user=>{
                    res.json(user)
                })
                .catch(err=>console.log(`Error: ${err}`))
            })
        })
    })

    app.post('/login', (req,res)=>{
        const credentials = req.body.credentials;
        db.User.findOne({userName: credentials.username}).then(user=>{
            bcrypt.compare(credentials.password, user.password).then(verified=>{
                if(verified){
                    return res.json({userId: user._id, user: user.data, userName: user.userName})
                }
                res.json('Incorrect username and password combination')
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    });

    app.post('/token/', (req,res)=>{
        const token = req.body.token;
        db.User.findOne({token: token}).then(user=>{
            if (!user){return res.json(false)};

            if (user.token === token){
                return res.json(user._id)
            }
        }).catch(err=>console.log(err))
    })
}