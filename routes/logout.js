const db = require('../controllers')

module.exports = (app) => {
    app.put('/logout/:user', db.logInorOut)
}