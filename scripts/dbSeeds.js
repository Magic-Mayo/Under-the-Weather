const db = require('../models');

const dummy = {
    data: {
        name: 'Dummy McDumberson',
        email: 'dummy@dum.dum',
        DOB: Date.now(),
        gender: 'Male',
        mediData: {
            insurance: [{
                provider: 'Blue Cross Blue Shield',
                type: 'Medical',
                idNumber: '123456',
                deductible: '5000/7500',
                copay: [{
                    doctor: 15,
                    specialist: 30,
                    urgentCare: 75,
                    emergency: 200,
                    prescription: {
                        brandName: 15,
                        generic: 2
                    }
                }],
                createdAt: Date.now()
            }],
            doctors: [{
                name: 'Dr. John Smith',
                type: 'Podiatrist',
                insuranceKey: '',
                createdAt: Date.now()
            },{
                name: 'Dr. Pocahontas',
                type: 'Pediatrician',
                insuranceKey: '',
                createdAt: Date.now()
            }]
        },
        emergencyContacts: [{
            name: 'Smart McDumberson',
            phone: 3365555000,
            address: '123 Oxymoron St Whynot, NC 27340',
            relationship: 'Mother'
        },{
            name: 'Slightly Dumber McDumberson',
            phone: 3365555000,
            address: '123 Oxymoron St Whynot, NC 27340',
            relationship: 'Father'
        },{
            name: 'Normal McNormal',
            phone: 5205552365,
            address: '456 Normal Rd Why, AZ 85789',
            relationship: 'Sister'
        }],
        symptomHistory: [{
            bodyPart: 'Head',
            painType: 'Sharp',
            severity: 'Mild',
            symptoms: 'Headache',
            time: Date.now(),
            diagnosis: '',
            createdAt: Date.now()
        },{
            bodyPart: 'Head',
            painType: 'Pounding',
            severity: 'Severe',
            symptoms: 'Headache',
            time: Date.now(),
            diagnosis: '',
            createdAt: Date.now()
        },{
            bodyPart: 'Stomach',
            painType: 'Nauseous',
            severity: 'Mild',
            symptoms: 'Stomach ache',
            time: Date.now(),
            diagnosis: '',
            createdAt: Date.now()
        },{
            bodyPart: 'Back',
            painType: 'Aching',
            severity: 'Mild',
            symptoms: 'Back ache',
            time: Date.now(),
            diagnosis: '',
            createdAt: Date.now()
        },{
            bodyPart: 'Head',
            painType: 'Sharp',
            severity: 'Mild',
            symptoms: 'Headache',
            time: Date.now(),
            diagnosis: '',
            createdAt: Date.now()
        }],
        isLoggedIn: true,
    },
    userName: 'dummy',
    password: 'iisabigdumdum',
    emailVerified: false,
    socialMedia: false,
    lastLogin: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now()
}

module.exports = (app) => {
    app.get('/dummydata', (req, res)=>{
        db.User.findOne({userName: dummy.userName})
            .then(user=>{
                console.log(user)
                if(!user){
                    db.User.create(dummy)
                        .then(dummy=>res.redirect(`http://localhost:3000/dashboard/${dummy._id}`))
                        .catch(err=>console.log(err))
                }
            })
    })
}