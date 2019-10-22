require('dotenv').config();
const uid = require('uid-safe');
const bcrypt = require('bcrypt');
const db = require('../controllers')

module.exports = (app) => {
    app.post('/auth/google', db.findorCreate)
    app.post('/auth/facebook', db.findorCreate)
}