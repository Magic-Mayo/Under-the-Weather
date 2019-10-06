const db = require('../models');

module.exports = {
    findById: (req,res)=>{
        db.User.findById(req.params.user)
            .then(user=>res.json(user)
            .catch(err=>res.json(err)))
    },
    update: (req,res)=>{
        db.User.findOneAndUpdate({userName: req.params.user},req.body)
            .then(updated=>res.json(updated))
            .catch(err=>res.json(err))
    },
    createUser: (req,res)=>{
        db.User.create(req.body)
            .then(newUser=>res.json(newUser))
            .catch(err=>res.json(err))
    }
}