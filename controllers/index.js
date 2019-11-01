const db = require('../models');
const bcrypt = require('bcrypt');
const uid = require('uid-safe');
const token = uid.sync(24);
const moment = require('moment');

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
        console.log(req.params)
        db.User.findOne({'data.email': req.params.email})
            .then(user=>{
                console.log(user)
                if(user){
                    return res.json(user.data)
                }
                res.json(false)
            })
    },
    updateAccount: (req,res,next)=>{
        const body = req.body;
        const param = req.params;
        const bodyOrNot = body.route || 'not';
        let route;
        switch(body.route){
            case 'addprovider': route = {$push: {'data.mediData.doctors': body.provider}}; break;
            case 'addcontact': route = {$push: {'data.emergencyContacts': body.contact}}; break;
            case 'addsymptom': route = {$push: {'data.symptomHistory': body.symptom}}; break;
            case 'addinsurance': route = {$push: {'data.mediData.insurance': body.insurance}}; break;
            case 'updateinsurance': route = {$set: body.insurance}; break;
            case 'updatecontact': route = {$set: body.contact}; break;
            case 'updateprovider': route = {$set: body.provider}; break;
            case 'updatesymptom': route = {$set: body.symptom}; break;
        }
        switch(param.route){        
            case 'deletesymptom': route = {$pull: {'data.symptomHistory': {_id: param.id}}}; break;
            case 'deleteinsurance': route = {$pull: {'data.mediData.insurance': {_id: param.id}}}; break;
            case 'deletecontact': route = {$pull: {'data.emergencyContacts': {_id: param.id}}}; break;
            case 'deleteprovider': route = {$pull: {'data.mediData.doctors': {_id: param.id}}}; break;
        }
        console.log("look here", param.id)
        
        if(bodyOrNot.substring(0,3) === 'add'){
            console.log(body)
            return db.User.findOneAndUpdate({_id: body.userId}, route, {new: true})
                .then(data=>{
                    if (!data){return}
                    res.json({user: data.data})
                })
                .catch(err=>res.json('Error adding data.  Please try again later.'));
        } else if(bodyOrNot.substring(0,3) === 'upd'){
            return db.User.findOneAndUpdate({[body.key]: body.userId}, route, {new:true})
                .then(data=>{
                    console.log(data)
                    if (!data){return}
                    res.json({user: data.data})
                })
                .catch(err=>res.json(err));
        } else if(param.route.substring(0,3)==='del' ){
            return db.User.findOneAndUpdate({_id: param.userId}, route, {new:true})
                .then(data=>{
                    console.log('delete',data)
                    return res.json({user: data.data})
                })
                .catch(err=>res.json('Error removing data.  Please try again later.'));
        }
        next();
    },
    updateProfile: (req,res,next)=>{
        console.log(req.body)
        if(req.body.update){
            return db.User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true})
                .then(updated=>res.json(updated.data))
                .catch(err=>console.log(err))
        }
        next();
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
    checkToken: (req,res)=>{
        const token = req.body.token;
        db.User.findOne({loginToken: token}).then(user=>{
            console.log(user)
            if (!user){return res.json(false)};

				if (user.loginToken === token) {
					return res.json({ userId: user._id, user: user.data, userName: user.userName });
				}
			})
			.catch((err) => console.log(err));
	},
	findAll: function(req, res) {
		db.User
			.find(req.query)
			.sort({ date: -1 })
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	findById: function(req, res) {
        console.log("THIS IS INSIDE THE FINDBYID FUNCTION", req.params);
		db.User.findById(req.params.id || req.params.user).then((dbModel) => res.json(dbModel)).catch((err) => res.status(422).json(err));
	},
	create: function(req, res) {
		db.User.create(req.body).then((dbModel) => res.json(dbModel)).catch((err) => res.status(422).json(err));
	},
	update: function(req, res) {
		console.log('HEY ', req.body.symptomHistory);
		db.User
			.findOneAndUpdate({ _id: req.params.id }, { $push: req.body.symptomHistory }, { new: true })
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	remove: function(req, res) {
		db.User
			.findById({ _id: req.params.id })
			.then((dbModel) => dbModel.remove())
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	}
};
