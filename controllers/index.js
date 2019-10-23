const db = require('../models');
const bcrypt = require('bcrypt');
const uid = require('uid-safe');
const token = uid.sync(24);


module.exports = {
    logInorOut: (req,res)=>{
        db.User.findById(req.params.user)
            .then(user=>{
                if (user.data.isLoggedIn && req.body.loggedIn === 'logout'){
                    return db.User.updateOne({_id: user._id}, {loginToken: '', 'data.isLoggedIn': false})
                        .then(res.json({loggedOut: false, path: '/'}))
                        .catch(err=>res.json({loggedOut: true}))
                }
                res.json({userId: user._id, user: user.data, userName: user.userName})
            })
            .catch(err=>console.log(err))
    },
    findByName: (req,res)=>{
        db.User.findOne(req.body)
            .then(user=>{
                if(user){
                    return res.json(false)
                }
                res.json(true)
            })
    },
    updateAccount: (req,res,next)=>{
        let route;
        switch(req.body.route){
            case 'addprovider': route = {$push: {'data.mediData.doctors': req.body.provider}}; break;
            case 'addcontact': route = {$push: {'data.mediData.doctors': req.body.contact}}; break;
            case 'addsymptom': route = {$push: {'data.mediData.doctors': req.body.symptom}}; break;
            case 'addinsurance': route = {$push: {'data.mediData.doctors': req.body.insurance}}; break;
            case 'updateinsurance': route = 
        }
        if()
        db.User.findOneAndUpdate({_id: req.body.userId}, route)
            .then(provider=>{
                console.log(provider)
                if (provider){
                    res.json('Provider added!')
                }
            })
            .catch(err=>res.json('Error adding provider.  Please try again later.'));
        next();
    },
    addSymptom: (req,res,next)=>{
        db.User.findOneAndUpdate({_id: req.body.userId}, {$push: {'data.symptomHistory': req.body.symptom}})
            .then(symptom=>{
                console.log(symptom)
                if (symptom){
                    res.json('Symptom added!')
                }
            })
            .catch(err=>res.json('Error adding symptom.  Please try again later.'));
        next();
    },
    addContact: (req,res,next)=>{
        db.User.findOneAndUpdate({_id: req.body.userId}, {$push: {'data.emergencyContacts': req.body.contact}})
            .then(contact=>{
                console.log(contact)
                if (contact){
                    res.json('Contact added!')
                }
            })
            .catch(err=>res.json('Error adding contact.  Please try again later.'))
        next();
    },
    addInsurance: (req,res,next)=>{
        db.User.findOneAndUpdate({_id: req.body.userId}, {$push: {'data.mediData.insurance': req.body.insurance}})
            .then(insurance=>{
                console.log(insurance)
                if (insurance){
                    res.json('Insurance added!')
                }
            })
            .catch(err=>res.json('Error adding Insurance.  Please try again later.'))
        next();
    },
    updateInsurance: (req,res,next)=>{
        db.User.findOneAndUpdate({_id: req.body.userId, 'data.mediData.insurance': req.body.insurance}, req.body.insurance, {new: true})
            .then(insurance=>{
                console.log(insurance)
                if (insurance){
                    res.json({msg: 'Insurance updated', update: insurance})
                }
            })
            .catch(err=>res.json('Error updating insurance.  Please try again later.'))
        next();
    },
    updateProvider: (req,res,next)=>{
        db.User.findOneAndUpdate({_id: req.body.userId, 'data.mediData.doctors': req.body.insurance}, req.body.insurance, {new: true})
            .then(insurance=>{
                console.log(insurance)
                if (insurance){
                    res.json({msg: 'Insurance updated', update: insurance})
                }
            })
            .catch(err=>res.json('Error updating insurance.  Please try again later.'))
        next();
    },
    updateContact: (req,res,next)=>{
        db.User.findOneAndUpdate({_id: req.body.userId, 'data.mediData.insurance': req.body.insurance}, req.body.insurance, {new: true})
            .then(insurance=>{
                console.log(insurance)
                if (insurance){
                    res.json({msg: 'Insurance updated', update: insurance})
                }
            })
            .catch(err=>res.json('Error updating insurance.  Please try again later.'))
        next();
    },
    updateSymptom: (req,res,next)=>{
        db.User.findOneAndUpdate({_id: req.body.userId, 'data.symptomHistory': req.body.symptom}, req.body.newSymptom, {new: true})
            .then(insurance=>{
                console.log(insurance)
                if (insurance){
                    res.json({msg: 'Insurance updated', update: insurance})
                }
            })
            .catch(err=>res.json('Error updating insurance.  Please try again later.'))
        next();
    },
    updateAccount: (req,res)=>{
        db.User.findOneAndUpdate({userName: req.params.user}, req.body, {new: true})
            .then(updated=>console.log(updated))
            .catch(err=>console.log(err))
    },
    findorCreate: (req,res)=>{
        console.log(req.body)
        db.User.findOne({userName: req.body.userName}).then(user=>{
            if(!user){
                return db.User.create(req.body)
                    .then(newUser=>{
                        db.User.findOneAndUpdate({_id: newUser._id}, {loginToken: token}, {new:true}).then(token=>{
                            res.json({userId: token._id, user: token.data, userName: token.userName, token: token.loginToken})
                        })
                        .catch(err=>console.log(err))
                    }).catch(err=>console.log(err))
            }
            db.User.findOneAndUpdate({_id: user._id}, {loginToken: token, 'data.isLoggedIn': true}, {new: true}).then(user=>{
                res.json({userId: user._id, user: user.data, userName: user.userName, token: user.loginToken})
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    },
    logSymptom: (req,res)=>{
        db.User.findOneAndUpdate({userName: req.params.user},req.body)
            .then(user=>{console.log(user)})
            .catch(err=>console.log(err))
    },
    checkToken: (req,res)=>{
        const token = req.body.token;
        db.User.findOne({loginToken: token}).then(user=>{
            console.log(user)
            if (!user){return res.json(false)};

            if (user.loginToken === token){
                return res.json({userId: user._id, user: user.data, userName: user.userName})
            }
        }).catch(err=>console.log(err))
    }
}