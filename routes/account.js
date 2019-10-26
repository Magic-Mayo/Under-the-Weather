const db = require('../controllers/index');

module.exports = (app) => {
    app.post('/account/insurance', db.updateAccount);
    app.put('/account/insurance', db.updateAccount);
    app.delete('/account/insurance/:route/:userId/:id', db.updateAccount);

    app.post('/account/contact', db.updateAccount);
    app.put('/account/contact', db.updateAccount);
    app.delete('/account/contact/:route/:userId/:id', db.updateAccount);

    app.post('/account/symptom', db.updateAccount);
    app.put('/account/symptom', db.updateAccount);
    app.delete('/account/symptom/:route/:userId/:id', db.updateAccount);

    app.post('/account/provider', db.updateAccount);
    app.put('/account/provider', db.updateAccount);
    app.delete('/account/provider/:route/:userId/:id', db.updateAccount);

    app.put('/account/profile/:userId', db.updateProfile);
    app.delete('/account/profile/:userId', db.updateProfile);
}