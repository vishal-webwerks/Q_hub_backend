var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
    name:String,
    highest_education:String,
    birth_date:String,
    email_id:String,
    address:String,
    skills:[{
        skill:String,
        desc:String
    }]
});

var Student_model = mongoose.model('students', studentSchema);

module.exports = Student_model;