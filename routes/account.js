const db = require('../controllers/index');

module.exports = (app) => {
    app.put('/account/:user', db.update)
}