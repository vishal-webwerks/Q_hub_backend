var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmpModelSchema = new Schema({
	emp_name:String,
	proffession:String,
	address:String,
	username:String,
	password:String,
	provider:String
});
var Employee_model = mongoose.model("employees", EmpModelSchema);

module.exports = Employee_model;