const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, default: ''},
    symptomHistory: [{
        symptomsValue: String,
        createdAt: Date
    }],
});

const User = mongoose.model('User', UserSchema);
module.exports = User;