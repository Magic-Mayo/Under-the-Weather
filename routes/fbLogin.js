require('dotenv').config();
const uid = require('uid-safe');
const axios = require('axios');

const state = uid.sync(18);

module.exports = (app) => {
    app.get('/auth/facebook', (req,res)=>{
        res.redirect(`https://www.facebook.com/v4.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT}&state=${state}&response_type=code&scope=public_profile%20email`)
        console.log('auth')
    });

    app.get('auth/facebook/callback', (req,res)=>{
        console.log('cb')
    });

    app.get('/login/', (req,res)=>{
        const token = req.query.code
        const urlState = req.query.state
        console.log(urlState)
        console.log(token)
        if (urlState===state){
            axios.get(`https://graph.facebook.com/v4.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${token}`)
                .then(user=>{
                    console.log(user.data)
                    axios.get(`graph.facebook.com/debug_token?input_token=${token}&access_token=${process.env.FACEBOOK_APP_TOKEN}`)
                        .then(user=>console.log(user))
                })
            // res.json('hello')
            // .redirect();
        } else {
            // console.log(req)
        }
        // console.log(req)
    });    
}