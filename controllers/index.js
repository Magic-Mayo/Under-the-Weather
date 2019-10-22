const db = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
    logInorOut: (req,res)=>{
        db.User.findById(req.params.user)
            .then(user=>{
                if (user.data.isLoggedIn && req.body.loggedIn === 'logout'){
                    return db.User.updateOne({_id: user._id}, {isLoggedIn: false})
                        .then(res.json({loggedOut: false, path: '/'}))
                        .catch(err=>res.json({loggedOut: true}))
                }
                res.json({userId: user._id, user: user.data, userName: user.userName})
            })
            .catch(err=>console.log(err))
    },
    updateAccount: (req,res)=>{
        db.User.findOneAndUpdate({userName: req.params.user}, req.body, {new: true})
            .then(updated=>console.log(updated))
            .catch(err=>console.log(err))
    },
    createUser: (req,res)=>{
        db.User.create(req.body)
            .then(newUser=>console.log(newUser))
            .catch(err=>console.log(err))
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