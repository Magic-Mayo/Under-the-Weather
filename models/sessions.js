const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionsSchema = new Schema({
    session: String
})

const Sessions = mongoose.model('Sessions', Sessions);
module.exports = SessionsSchema;