const db = require('../models');
const bcrypt = require('bcrypt');
const uid = require('uid-safe');

module.exports = (app) => {
    app.post('/newlocal', (req,res)=>{
        const token = uid.sync(18)
        bcrypt.hash(req.body.credentials.password, 12)
        .then(hash=>{
            db.User.create({
                userName: req.body.credentials.username,
                password: hash,
                token: token
            })
            .then(user=>{
                res.json(user)
            })
            .catch(err=>res.json(`Error: ${err}`))
        })
    })

    app.post('/login', (req,res)=>{
        db.User.findOne({userName: req.body.credentials.username}).then(user=>{
            if (user.password === req.body.credentials.password){
                return res.json(user)
            }
            return res.json('Incorrect username and password combination')
        }).catch(err=>console.log(err))
    });
}