require('dotenv').config();
const db = require('../controllers')

module.exports = (app) => {
    app.post('/auth/google', db.findorCreate)
    app.post('/auth/facebook', db.findorCreate)
}