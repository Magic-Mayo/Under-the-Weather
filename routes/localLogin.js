const db = require('../models');
const bcrypt = require('bcrypt');
const uid = require('uid-safe');
const token = uid.sync(24);

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
        db.User.findOne({userName: credentials.username}).then(user=>{
            // bcrypt.compare(credentials.password, user.password).then(verified=>{
                if (user.password === credentials.password){
                    return res.json({userId: user._id, user: user.data, userName: user.userName})
                }
                res.json('Incorrect username and password combination')
            }).catch(err=>console.log(err))
        // }).catch(err=>console.log(err))
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