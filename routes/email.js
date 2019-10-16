require('dotenv').config();
const mail = require('nodemailer');


module.exports = (app) => {
    app.get('/verify/email', (req,res) => {
        const user = {
            id: 65146484
        }
        const transport = mail.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASS
            }
        })
        // db.findById().then(user=>{
            const message = {
            from: 'undertheweather2019@gmail.com',
            to: user.email || 'mayom15@hotmail.com',
            subject: 'DO NOT REPLY: E-mail verification',
            text: `Please follow the link to verify your email address. If the link does not work please copy and paste the following into your browser to verify your email address: https://under-the-weather.herokuapp.com/verify/email/${user.id}`,
            html: `<p>Please follow the <a href='https://under-the-weather.herokuapp.com/verify/email/${user.id}'>link</a> to verify your email address. If the link does not work please copy and paste the following into your browser to verify your email address: https://under-the-weather.herokuapp.com/verify/email/${user.id}</p>`
            };
        // })
        transport.sendMail(message, (err,res)=>{
            if(err){
                console.log(err)
            }else{
                console.log(res)
            }
        })
        res.redirect('/')
    })
}
