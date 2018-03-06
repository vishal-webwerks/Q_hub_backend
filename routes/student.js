var express = require('express');
var router = express.Router();
var Student_model = require('../models/studentModel');

router.post('/save', function(req, res){

    let skills_arr = req.body.skills;
    let skills_obj = [];
    for(var i=0; i<skills_arr.length; i++){
        skills_obj.push(skills_arr[i]);
    }

    var newStud = new Student_model({
        name: req.body.name,
        highest_education: req.body.highest_education,
        //birth_date: req.body.birth_date,
        email_id: req.body.email_id,
        address: req.body.address,
        skills: skills_arr
    });

    newStud.save(function (err, Student_model) {
        
        if (err) 
            res.json({'status':'error', 'msg':'Student Not Saved!'+err});
        else
            res.json({'status':'success', 'msg':'Student Saved!'});
        
    });

});

router.post('/update', function(req, res){
    
    let _id = req.body._id;

    let skills_arr = req.body.skills;

    Student_model.findById(_id, function(err, stud){
        if(!stud){
            res.json({ status:'error', msg: 'Student not found' });
        }
        else{

            stud.name = req.body.name;
            stud.highest_education = req.body.highest_education;
            //stud.birth_date = req.body.birth_date;
            stud.email_id = req.body.email_id;
            stud.address = req.body.address;
            stud.skills  = skills_arr;

            stud.save(function (err, stud) {
                
                if (err) 
                    res.json({'status':'error', 'msg':'Student Not Updated!'+err});
                else
                    res.json({'status':'success', 'msg':'Student Updated!'});
                
            });

        }
    });


});

router.get('/get', function(req, res){

    Student_model.find(function(err, response){
        res.json(response);
    });

});

router.get('/getCount', function(req, res){

    Student_model.count(function(err, response){
        console.log(response);
        res.json({'studCount':response});
    });

});

router.post('/getOne', function(req, res){

    var studId = req.body.studId;
    
    Student_model.findOne({_id: studId}, function(err, response){
        res.json(response);
    });
    
});

module.exports = router;