var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var Employee_model = require('../models/employeeModel');

//**Get Employee List
router.get('/get_emp_list', function(req, res){
	Employee_model.find(function(err, response){
      res.json(response);
   });
});

router.get('/dummy', function(req, res){
	res.send(req.user);	
});


//**Get employee count
router.get('/get_emp_count', function(req, res){

	var jsonStr = {empCount:0, proffCount:0};

	Employee_model.count(function(err, response1){
      jsonStr.empCount = response1;

      Employee_model.find().distinct('proffession').count(function(err, response2){
	      jsonStr.proffCount = response2;
	      res.json(jsonStr);
	  });

    });

});

//**Get single employee info
router.post('/get_emp_info', function(req, res){
	var emp_id = req.body.emp_id;

	Employee_model.findOne({_id: emp_id}, function(err, response){
      res.json(response);
   });
});


//**Save employee
router.post('/save_emp', function(req, res){

   var password = req.body.password;

   bcrypt.hash(password, 10, function(err, hash) {
	  if (err) 
	  	res.json({'status':'error', 'msg':'Password not encrypted!'});
	  else{

	  	   var emp_name = req.body.emp_name;
		   var proffession = req.body.proffession;
		   var address = req.body.address;
		   var username = req.body.username;		   

		   var newEmp = new Employee_model({
		     emp_name: emp_name,
		     proffession: proffession,
		     address: address,
		     username: username,
		     password: hash
		   });

		   newEmp.save(function (err, Employee_model) {

			  if (err) 
			  	res.json({'status':'error', 'msg':'Employee Not Saved!'});
			  else
			  	res.json({'status':'success', 'msg':'Employee Saved!'});
			  
		   });

	  }


   });   
   
});


//**Update employee
router.post('/update_emp', function(req, res){

   var emp_id = req.body.emp_id;
   var emp_name = req.body.emp_name;
   var proffession = req.body.proffession;
   var address = req.body.address;
   var username = req.body.username;

   Employee_model.findById(emp_id, function(err, newEmp) {
	  if (!newEmp)
	    res.json({'status':'error', 'msg':'Employee Not Found!'});
	  else {
	   
	       newEmp.emp_name= emp_name;
	       newEmp.proffession= proffession;
	       newEmp.address= address;
	       newEmp.username= username;

		   newEmp.save(function (err, Employee_model) {
			  if (err) 
			  	res.json({'status':'error', 'msg':'Employee Not Updated!'});
			  else
			  	res.json({'status':'success', 'msg':'Employee Updated!'});
			  
		   });


	  }
	});

});

module.exports = router;