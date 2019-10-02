const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: String,
    password: String,
    name: String,
    DOB: String,
    mediData: {
        insurance: [{
            provider: String,
            type: String,
            idNumber: String,
            createdAt: Date
        }],
        doctors: [{
            name: String,
            type: String,
            insuranceKey: String,
            createdAt: Date
        }]
    },
    symptomHistory: [{
        type: String,
        pain: Number,
        symptoms: String,
        time: Date,
        diagnosis: String,
        createdAt: Date
    }],
    createdAt: Date,
    updatedAt: Date
});

const User = mongoose.model('UserSchema', UserSchema);
module.exports = User;