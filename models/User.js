const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {type: String, unique: true},
    password: {type: String, default: ''},
    name: {type: String, default: ''},
    email: {type: String, default: ''},
    DOB: {type: Date, default: ''},
    gender: {type: String, default: ''},
    mediData: {
        insurance: [{
            provider: {type: String, default: ''},
            type: {type: String, default: ''},
            idNumber: {type: String, default: ''},
            deductible: {type: String, default: ''},
            copay: [{
                doctor: Number,
                specialist: Number,
                urgentCare: Number,
                emergency: Number,
                prescription: {
                    brandName: Number,
                    generic: Number
                }
            }],
            createdAt: Date
        }],
        doctors: [{
            name: {type: String, default: ''},
            type: {type: String, default: ''},
            insuranceKey: {type: String, default: ''},
            createdAt: Date
        }]
    },
    emergencyContacts: [{
        name: String,
        phone: Number,
        address: String,
        relationship: String
    }],
    symptomHistory: [{
        type: String,
        pain: Number,
        symptoms: String,
        time: Date,
        diagnosis: String,
        createdAt: Date
    }],
    emailVerified: Boolean,
    createdAt: Date,
    updatedAt: Date
});

const User = mongoose.model('UserSchema', UserSchema);
module.exports = User;