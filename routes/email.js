require('dotenv').config();
const mail = require('nodemailer');
const db = require('../models');

module.exports = (app) => {
    app.get('/new/email/:user', (req,res) => {
        console.log(req.params)
        const id = req.params.user.split('#')[0];
        console.log(id)
        const transport = mail.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASS
            }
        })
        db.User.findOne({_id: id}).then(user=>{
            const message = {
            from: process.env.EMAIL_ADDRESS,
            to: user.email,
            subject: 'Under the Weather: E-mail verification',
            text: `Please follow the link to verify your email address. If the link does not work please copy and paste the following into your browser to verify your email address: https://under-the-weather.herokuapp.com/verify/email/${user._id}`,
            html: `<p>Please follow the <a href='https://under-the-weather.herokuapp.com/verify/email/${user._id}'>link</a> to verify your email address. If the link does not work please copy and paste the following into your browser to verify your email address: https://under-the-weather.herokuapp.com/verify/email/${user._id}</p>`
            };

            transport.sendMail(message, (err,res)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log(res)
                }
            })
        }).then(res.redirect(`http://localhost:3000/dashboard/${id}`))
    })

    app.get('verify/email/:user', (req,res)=>{
        
    })
}
