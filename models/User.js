const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {type: String, required: [true, 'User name is required'], unique: true},
    password: {type: String, default: ''},
    name: {type: String, default: ''},
    email: {type: String, default: ''},
    DOB: {type: Date, default: ''},
    mediData: {
        insurance: [{
            provider: {type: String, default: ''},
            type: {type: String, default: ''},
            idNumber: {type: String, default: ''},
            createdAt: Date
        }],
        doctors: [{
            name: {type: String, default: ''},
            type: {type: String, default: ''},
            insuranceKey: {type: String, default: ''},
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