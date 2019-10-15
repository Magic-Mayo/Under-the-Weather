const db = require('../controllers')

module.exports = (app) => {
    app.get('/home/:user', (req,res)=>{
        db.findById
    })
}