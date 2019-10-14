require('dotenv').config();
const uid = require('uid-safe');
const axios = require('axios');
const controller = require('../controllers');
const db = require('../models');
const state = uid.sync(18);

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
                            console.log(user)
                            if(!user){
                                db.User.create({
                                    userName: userData.data.id,
                                    name: userData.data.name,
                                    email: userData.data.email
                                }).then(newUser=>{
                                    axios.get(`http://localhost:3000/new/email/${newUser.userName}`)
                                }).catch(err=>console.log(err))
                            } else {
                                res.redirect(`http://localhost:3000/home/${user.userName}`)
                            }
                        }).catch(err=>console.log(err))
                    }).catch(err=>console.log(err))
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }
    });

    // app.get('/new/email/:user', (req,res) => {
    //     const id = req.params.user.split('#')[0];
    //     console.log(req)
    //     const transport = mail.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: process.env.EMAIL_ADDRESS,
    //             pass: process.env.EMAIL_PASS
    //         }
    //     })
    //     db.findOne({userName: id}).then(user=>{
    //         const message = {
    //         from: process.env.EMAIL_ADDRESS,
    //         to: user.email,
    //         subject: 'Under the Weather: E-mail verification',
    //         text: `Please follow the link to verify your email address. If the link does not work please copy and paste the following into your browser to verify your email address: https://under-the-weather.herokuapp.com/verify/email/${user.id}`,
    //         html: `<p>Please follow the <a href='https://under-the-weather.herokuapp.com/verify/email/${user.id}'>link</a> to verify your email address. If the link does not work please copy and paste the following into your browser to verify your email address: https://under-the-weather.herokuapp.com/verify/email/${user.id}</p>`
    //         };

    //         transport.sendMail(message, (err,res)=>{
    //             if(err){
    //                 console.log(err)
    //             } else {
    //                 console.log(res)
    //                 // res.redirect('/')
    //             }
    //         })
    //     })
    // })
}