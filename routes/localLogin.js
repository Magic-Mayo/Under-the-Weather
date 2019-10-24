const db = require('../models');
const bcrypt = require('bcrypt');
const uid = require('uid-safe');
const token = uid.sync(18)

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
        db.User.findOne({userName: credentials.email}).then(user=>{
            // bcrypt.compare(credentials.password, user.password).then(verified=>{
                if (user.password === credentials.password){
                    return db.User.findOneAndUpdate({userName: credentials.email},
                    {isLoggedIn: true, token: token},
                    {new:true})
                    .then(updated=>res.json(updated))
                    .catch(err=>console.log(err))
                }
                return res.json('Incorrect username and password combination')
            // })
        }).catch(err=>console.log(err))
    });
}