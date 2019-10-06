const db = require('../controllers/index');

module.exports = (app) => {
    app.put('/user/:user',db.update)
}