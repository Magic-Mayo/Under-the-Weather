require('dotenv').config();
const uid = require('uid-safe');

const state = uid.sync(18);
let codeX;
const code = async (token) => {
    const newToken = await token;
    return codeX = newToken;
};

// async function token(token){
//     let ;
//     return `graph.facebook.com/debug_token?input_token=${newToken}&access_token=${process.env.FACEBOOK_APP_ID}`
// }

// `https://graph.facebook.com/v4.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000/login%2Fuser%2F&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${

module.exports = (app) => {
    app.get('/auth/facebook', (req,res)=>{
        res.redirect(`https://www.facebook.com/v4.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT}&state=${state}&response_type=code`)
        console.log('auth')
    });

    app.get('auth/facebook/callback', (req,res)=>{
        console.log('cb')
    });

    app.get('/login/:token', (req,res)=>{
        if (req.params.token.split('state=')[1]===state){
            const token = async (token) => {
                const newToken = await token
                return newToken;
            }
            token(req.params.token.split('code=')[1].split('&')[0]).then(user=>code(user))
            // res.json('hello')
            // redirect();
        } else {
            res.json('Wrong token sucka')
        }
    });

    // app.get('/login/user/*', (req,res)=>{
    //     console.log(req)
    // });
    
}