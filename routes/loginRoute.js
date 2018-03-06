var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var router = express.Router();
var Employee_model = require('../models/employeeModel');


/* passport.use(new LocalStrategy(function(username, password, done) {  	 
		Employee_model.findOne({ username : username }, function(err, emp){

			if(err)
			    return done(null, false, {'status':'error', 'msg':'Error in login!'});
			else if(!emp)
				return done(null, false, {'status':'error', 'msg':'Invalid login credentials!'});				
			else{

				bcrypt.compare(password, emp.password, function(err, valid) {
				    if(err)
				    	return done(null, false, {'status':'error', 'msg':'Employee Not Saved!'});
				    else if(!valid)
				    	return done(null, false, {'status':'error', 'msg':'Invalid login credentials!'});
				    else{
				    	return done(null, emp, {'status':'success', 'msg':'Login successfull'});
				    }

				});	
			}
			

		}); 

  }
));

router.post('/', function(req, res, next){

	var username = req.body.username;
	var password = req.body.password;

	passport.authenticate('local', { session: true }, function(err, user, info){

		if(info.status=="success"){
			req.session.user = user;
			console.log(req.session.user);
		}
		res.json(info);
	})(req, res, next);
	
}); */

router.post('/', function(req, res, next){
	
	var username = req.body.username;
	var password = req.body.password;

	token = "";

	Employee_model.findOne({ username : username }, function(err, emp){
		
		if(err)
			res.json( {'status':'error', 'msg':'Error in login!', 'token':token, 'user':emp});
		else if(!emp)
			res.json({'status':'error', 'msg':'Invalid login credentials!', 'token':token, 'user':emp});				
		else{

			bcrypt.compare(password, emp.password, function(err, valid) {
				
				if(err)
					res.json({'status':'error', 'msg':'Employee Not Saved!', 'token':token, 'user':emp});
				else if(!valid)
					res.json({'status':'error', 'msg':'Invalid login credentials!', 'token':token, 'user':emp});
				else{

					var token = jwt.sign({
						data: emp
					}, 'secret', { expiresIn: '1h' });	

					res.json({'status':'success', 'msg':'Login successfull', 'token':token, 'user':emp});
				}

			});
		}
		

	}); 

});

router.post('/socialLogin', function(req, res){

	var emp_name = req.body.name;
	var username = req.body.uid;	
	var provider = req.body.provider;	
	
	Employee_model.findOne({ username : username, provider:provider }, function(err, emp){

		if(err){
			res.json( {'status':'error', 'msg':'Error in login!', 'token':token, 'user':emp});
		}			
		else if(!emp){

			var newEmp = new Employee_model({
				emp_name: emp_name,
				username: username,
				provider:provider
			  });
		  
			  newEmp.save(function (err, emp1) {
		  
				 if (err) 
					 res.json({'status':'error', 'msg':'Employee Not Saved!', 'token':token, 'user':emp});
				 else{
					var token = jwt.sign({
						data: emp1
					}, 'secret', { expiresIn: '1h' });	
					res.json({'status':'success', 'msg':'Login successfull', 'token':token, 'user':emp1});
				 }
					 
				 
			  });

		}
		else{

			var token = jwt.sign({
				data: emp
			}, 'secret', { expiresIn: '1h' });	
			res.json({'status':'success', 'msg':'Login successfull', 'token':token, 'user':emp});

		}
			


	});	

});

module.exports = router;