const db = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
    logInorOut: (req,res)=>{
        db.User.findById(req.params.user)
            .then(user=>{
                if (user.isLoggedIn && !req.body){
                    db.User.updateOne({_id: user._id}, {isLoggedIn: false})
                        .then(()=>{return res.json({loggedOut: false, path: '/'})})
                        .catch(err=>res.json({loggedOut: true}))
                }
                res.json(user)})
            .catch(err=>console.log(err))
    },
    updateAccount: (req,res)=>{
        db.User.findOneAndUpdate({userName: req.params.user},req.body)
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
        .then(loggedOut=>res.json({loggedOut: false, path: '/'}))
        .catch(err=>{console.log(err);res.json(true)})
    }
}