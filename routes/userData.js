const moment = require('moment');
const db = require('../controllers');

module.exports = (app) => {
    app.post('/user/:user', (req,res)=>{
        db.updateAccount
    })
}