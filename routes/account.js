const db = require('../controllers/index');

module.exports = (app) => {
    app.post('/account/insurance', db.updateAccount);
    app.put('/account/insurance', db.updateAccount);
    app.delete('/account/insurance', db.updateAccount);

    app.post('/account/contact', db.updateAccount);
    app.put('/account/contact', db.updateAccount);
    app.delete('/account/contact', db.updateAccount);

    app.post('/account/symptom', db.updateAccount);
    app.put('/account/symptom', db.updateAccount);
    app.delete('/account/symptom', db.updateAccount);

    app.post('/account/provider', db.updateAccount);
    app.put('/account/provider', db.updateAccount);
    app.delete('/account/provider', db.updateAccount);
    
    app.post('/account/profile', db.updateAccount);
    app.put('/account/profile', db.updateAccount);
    app.delete('/account/profile', db.updateAccount);
}