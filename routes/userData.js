// const moment = require('moment');
const db = require('../controllers');

module.exports = (app) => {
    app.get('/user/:user', db.logInorOut)
}