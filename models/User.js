const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    data:{
        firstName: {type: String, default: ''},
        lastName: {type: String, default: ''},
        email: {type: String, require: true},
        age: {type: Number, default: ''},
        gender: {type: String, default: ''},
        mediData: {
            insurance: [{
                provider: {type: String, default: ''},
                insuranceType: {type: String, default: ''},
                groupNumber: {type: String, default: ''},
                idNumber: {type: String, default: ''},
                deductible: {type: String, default: ''},
                copay: {
                    doctor: {type: Number, default: ''},
                    specialist: {type: Number, default: ''},
                    urgentCare: {type: Number, default: ''},
                    emergency: {type: Number, default: ''},
                    prescription: {
                        brandName: {type: Number, default: ''},
                        generic: {type: Number, default: ''}
                    }
                },
                updatedAt: Date,
                createdAt: Date
            }],
            doctors: [{
                name: {type: String, default: ''},
                doctorType: {type: String, default: ''},
                insurance: {type: String, default: ''},
                address: {
                    streetAddress: {type: String, default: ''},
                    city: {type: String, default: ''},
                    state: {type: String, default: ''},
                    zip: {type: Number, default: ''}
                },
                phone: {type: String, default: ''},
                email: {type: String, default: ''},
                website: {type: String, default: ''},
                updatedAt: Date,
                createdAt: Date
            }]
        },
        emergencyContacts: [{
            name: {type: String, default: ''},
            phone: {type: Number, default: ''},
            address: {
                streetAddress: {type: String, default: ''},
                city: {type: String, default: ''},
                state: {type: String, default: ''},
                zip: {type: Number, default: ''}
            },
            relationship: {type: String, default: ''},
            updatedAt: Date,
            createdAt: Date
        }],
        symptomHistory: [{
            bodyPart: {type: String, default: ''},
            painType: {type: String, default: ''},
            severity: {type: String, default: ''},
            symptoms: {type: String, default: ''},
            time: Date,
            diagnosis: {type: String, default: ''},
            updatedAt: Date,
            createdAt: Date
        }],
        isLoggedIn: Boolean,
    },
    // userName: {type: String, unique: true},
    loginToken: String,
    lastLogin: Date,
    socialMedia: {type: Boolean, default: false},
    emailVerified: Boolean,
    password: {type: String, default: ''},
    createdAt: Date,
    updatedAt: Date
});

const User = mongoose.model('UserSchema', UserSchema);
module.exports = User;