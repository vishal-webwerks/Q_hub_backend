var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var session = require("express-session")
var passport = require('passport');
var jwt = require('jsonwebtoken');

var mongoDB = 'mongodb://meanapp_u:meanapp_u@ds149535.mlab.com:49535/mean_app';
mongoose.connect(mongoDB, { useMongoClient: true });

app.use(cors());

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.use(express.static("public"));
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var employee = require('./routes/employee');
app.use('/employee', employee);
var student = require('./routes/student');
app.use('/student', student);
var loginRoute = require('./routes/loginRoute');
app.use('/login', loginRoute);

/* app.use(function(req, res, next){
    let token = req.headers.authorization;
    jwt.verify(token, 'secret', function(err, decoded) {
        if(err){
            console.log('Error');
            return res.json({'status':'error'});
        }
        else{
            next();
        }
    });
}); */

app.post('/authenticate', function(req, res){
    let token = req.headers.authorization;
    jwt.verify(token, 'secret', function(err, decoded) {
        if(err){
            console.log('Error');
            res.json({'status':'error'});
        }
        else{
            console.log(decoded);
            res.json({'status':'success'});
        }
    });
});


app.listen(5000);