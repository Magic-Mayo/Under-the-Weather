require('dotenv').config();
const uid = require('uid-safe');
const axios = require('axios');
const controller = require('../controllers');
const db = require('../models');
const state = uid.sync(18);
const moment = require('moment');

module.exports = (app) => {
    app.get('/auth/facebook', (req,res)=>{
        res.redirect(`https://www.facebook.com/v4.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT}&state=${state}&response_type=code&scope=public_profile%20email&display=popup`)
    });

    app.get('/auth/facebook/login', (req,res)=>{
        const token = req.query.code
        const urlState = req.query.state
        if (urlState === state){
            axios.get(`https://graph.facebook.com/v4.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${token}`).then(code=>{
                
                axios.get(`https://graph.facebook.com/debug_token?input_token=${code.data.access_token}&access_token=${process.env.FACEBOOK_APP_TOKEN}`).then(debuggedToken=>{
                    
                    axios.get(`https://graph.facebook.com/${debuggedToken.data.data.user_id}?fields=id,email,name&access_token=${code.data.access_token}`).then(userData=>{

                        db.User.findOne({userName: userData.data.id}).then(user=>{
                            // console.log(user)
                            if(!user){
                                db.User.create({
                                    userName: userData.data.id,
                                    name: userData.data.name,
                                    email: userData.data.email,
                                    token: code.data.access_token,
                                    lastLogin: moment()
                                }).then(newUser=>{
                                    axios.get(`/new/email/${newUser.userName}`)
                                    .then(res.redirect('http://localhost:3000/'))
                                }).catch(err=>console.log(err))
                            }
                            db.User.update({where: {userName: user.userName}, lastLogin: moment()})
                            .then(user=>{
                                res.redirect('http://localhost:3000/')
                            })
                        }).catch(err=>console.log(err))
                    }).catch(err=>console.log(err))
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }
    });
}