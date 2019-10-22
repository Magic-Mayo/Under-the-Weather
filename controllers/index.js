const db = require('../models');
const bcrypt = require('bcrypt');
const uid = require('uid-safe');
const token = uid.sync(24);


module.exports = {
    logInorOut: (req,res)=>{
        db.User.findById(req.params.user)
            .then(user=>{
                if (user.data.isLoggedIn && req.body.loggedIn === 'logout'){
                    return db.User.updateOne({_id: user._id}, {loginToken: '', 'data.isLoggedIn': false})
                        .then(res.json({loggedOut: false, path: '/'}))
                        .catch(err=>res.json({loggedOut: true}))
                }
                res.json({userId: user._id, user: user.data, userName: user.userName})
            })
            .catch(err=>console.log(err))
    },
    findByName: (req,res)=>{
        db.User.findOne(req.body)
            .then(user=>{
                if(user){
                    return res.json(false)
                }
                res.json(true)
            })
    },
    updateAccount: (req,res)=>{
        db.User.findOneAndUpdate({userName: req.params.user}, req.body, {new: true})
            .then(updated=>console.log(updated))
            .catch(err=>console.log(err))
    },
    findorCreate: (req,res)=>{
        console.log(req.body)
        db.User.findOne({userName: req.body.userName}).then(user=>{
            if(!user){
                return db.User.create(req.body)
                    .then(newUser=>{
                        db.User.findOneAndUpdate({_id: newUser._id}, {loginToken: token}, {new:true}).then(token=>{
                            res.json({userId: token._id, user: token.data, userName: token.userName, token: token.loginToken})
                        })
                        .catch(err=>console.log(err))
                    }).catch(err=>console.log(err))
            }
            db.User.findOneAndUpdate({_id: user._id}, {loginToken: token, 'data.isLoggedIn': true}, {new: true}).then(user=>{
                res.json({userId: user._id, user: user.data, userName: user.userName, token: user.loginToken})
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    },
    logSymptom: (req,res)=>{
        db.User.findOneAndUpdate({userName: req.params.user},req.body)
            .then(user=>{console.log(user)})
            .catch(err=>console.log(err))
    },
    checkToken: (req,res)=>{
        db.User.findOneAndUpdate({userName: req.params.user})
        .then(res.json({loggedOut: false, path: '/'}))
        .catch(err=>{console.log(err);res.json(true)})
    }
}