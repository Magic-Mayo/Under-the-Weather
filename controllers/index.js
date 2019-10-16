const db = require('../models');

module.exports = {
    findOne: (req,res)=>{
        db.User.findOne({userName: req.params.user})
            .then(user=>res.json(user))
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

}