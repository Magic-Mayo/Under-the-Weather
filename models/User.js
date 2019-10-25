const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    data:{
        name: {type: String, default: ''},
        email: {type: String, default: ''},
        DOB: {type: Date, default: ''},
        gender: {type: String, default: ''},
        mediData: {
            insurance: [{
                provider: {type: String, default: ''},
                insuranceType: {type: String, default: ''},
                groupNumber: {type: String, default: ''},
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
                updatedAt: Date,
                createdAt: Date
            }],
            doctors: [{
                name: {type: String, default: ''},
                doctorType: {type: String, default: ''},
                insurance: {type: String, default: ''},
                address: {type: String, default: ''},
                phone: {type: String, default: ''},
                updatedAt: Date,
                createdAt: Date
            }]
        },
        emergencyContacts: [{
            name: String,
            phone: Number,
            address: String,
            relationship: String,
            updatedAt: Date,
            createdAt: String
        }],
        symptomHistory: [{
            bodyPart: String,
            painType: String,
            severity: String,
            symptoms: String,
            time: Date,
            diagnosis: String,
            updatedAt: Date,
            createdAt: Date
        }],
        isLoggedIn: Boolean,
    },
    userName: {type: String, unique: true},
    loginToken: String,
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date,
    socialMedia: {type: Boolean, default: false},
    emailVerified: Boolean,
    password: {type: String, default: ''}
});

const User = mongoose.model('UserSchema', UserSchema);
module.exports = User;