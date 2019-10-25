const db = require('../controllers')

module.exports = (app) => {
    app.post('symptoms', (req, res)=>{
        db.Symptoms.create({
            
        })
    })
}