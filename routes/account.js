const db = require('../controllers/index');

module.exports = (app) => {
    app.post('/account/insurance', db.addInsurance)
}