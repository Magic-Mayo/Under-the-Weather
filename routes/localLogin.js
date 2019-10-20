const db = require('../models');
const bcrypt = require('bcrypt');
const uid = require('uid-safe');
const token = uid.sync(24)

module.exports = (app) => {
    app.post('/newlocal', (req,res)=>{
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
        const credentials = req.body.credentials;
        console.log(credentials)
        db.User.findOne({userName: credentials.username}).then(user=>{
            // bcrypt.compare(credentials.password, user.password).then(verified=>{
                if (user.password === credentials.password){
                    return db.User.findOneAndUpdate(
                    {userName: credentials.username},
                    {isLoggedIn: true, $upsert: {token: token}},
                    {new:true})
                    .then(updated=>res.json(updated))
                    .catch(err=>console.log(err))
                }
                return res.json('Incorrect username and password combination')
            })
        // }).catch(err=>console.log(err))
    });

    app.post('/token/', (req,res)=>{
        const token = req.body.token;
        db.User.findOne({token: token}).then(user=>{
            console.log(user)
            if (user.token){
                if (user.token === token){
                    return res.json(user._id)
                }
                return res.json('false')
            }
            res.json('false')
        }).catch(err=>console.log(err))
    })
}